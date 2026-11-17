import {getProducts,saveProducts,getOrders,saveOrders,getUsers,saveUsers} from '@/lib/db';
import {getUser} from '@/lib/auth';import {bill} from '@/lib/pricing';
const err=(m,s=400)=>Response.json({error:m},{status:s});
const luhn=n=>/^\d{13,19}$/.test(n)&&[...n].reverse().reduce((s,d,i)=>{d=+d;if(i%2){d*=2;if(d>9)d-=9}return s+d},0)%10===0;
export async function GET(){const u=getUser();if(!u)return err('Log in to see your orders.',401);
 return Response.json(getOrders().filter(o=>o.userId===u.id))}
export async function POST(req){
 const u=getUser();if(!u)return err('Log in to place an order.',401);
 const {items,address:a={},card:c={}}=await req.json();
 const ps=getProducts(),lines=[];
 for(const i of items||[]){const p=ps.find(x=>x.id==i.id),q=Math.floor(+i.qty);
  if(!p||!(q>=1))return err('An item in your cart no longer exists.');
  if(q>p.stock)return err(`Only ${p.stock} of ${p.name} left in stock.`);
  lines.push({id:p.id,name:p.name,price:p.price,qty:q})}
 if(!lines.length)return err('Your cart is empty.');
 if(!['name','line1','city','zip','country'].every(k=>String(a[k]||'').trim()))return err('Complete the delivery address.');
 const num=String(c.number||'').replace(/\D/g,'');
 if(!luhn(num))return err('Card number is not valid.');
 if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(c.exp||''))return err('Enter card expiry as MM/YY.');
 if(!/^\d{3,4}$/.test(c.cvv||''))return err('Enter the 3 or 4 digit security code.');
 lines.forEach(l=>{ps.find(p=>p.id==l.id).stock-=l.qty});saveProducts(ps);
 const b=bill(lines),last4=num.slice(-4);
 const order={id:'ORD-'+Date.now(),userId:u.id,date:new Date().toISOString(),items:JSON.stringify(lines),subtotal:b.sub,shipping:b.ship,tax:b.tax,total:b.total,address:JSON.stringify(a),card:'**** '+last4,status:'Placed'};
 saveOrders([...getOrders(),order]);
 // Never store the full card number or CVV: keep only brand-safe reference data.
 const users=getUsers(),me=users.find(x=>x.id===u.id);
 me.addresses=[a,...(me.addresses||[]).filter(x=>JSON.stringify(x)!==JSON.stringify(a))].slice(0,3);
 me.cards=[{holder:c.holder||'',last4,exp:c.exp},...(me.cards||[]).filter(x=>x.last4!==last4)].slice(0,3);
 saveUsers(users);
 return Response.json({id:order.id});
}
