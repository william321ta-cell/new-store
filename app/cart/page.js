'use client';
import Link from 'next/link';import {useEffect,useState} from 'react';import {useCart} from '@/components/Cart';import {bill,money} from '@/lib/pricing';
export default function Cart(){const {items,setQty,remove}=useCart();const [ps,setPs]=useState(null);
 useEffect(()=>{fetch('/api/products').then(r=>r.json()).then(setPs)},[]);
 if(!ps)return <p>Loading your cart…</p>;
 const lines=items.map(i=>{const p=ps.find(x=>x.id===i.id);return p&&{...p,qty:Math.min(i.qty,p.stock)}}).filter(Boolean);
 const b=bill(lines);
 if(!lines.length)return <><h1 style={{fontSize:'2.4rem'}}>Your cart is empty</h1><Link className="btn" href="/">Browse products</Link></>;
 return <div className="two"><section><h2>Cart</h2>{lines.map(l=><div className="row" key={l.id}>
  <span>{l.emoji} <b>{l.name}</b><br/><span className="mut">{money(l.price)} each</span></span>
  <span className="qty"><button aria-label="Decrease" onClick={()=>setQty(l.id,l.qty-1)}>−</button>{l.qty}
  <button aria-label="Increase" disabled={l.qty>=l.stock} onClick={()=>setQty(l.id,l.qty+1)}>+</button></span>
  <b>{money(l.price*l.qty)}</b><button className="link" onClick={()=>remove(l.id)}>Remove</button></div>)}</section>
 <aside className="card"><h2>Bill</h2>
  <div className="row"><span>Subtotal</span><span>{money(b.sub)}</span></div>
  <div className="row"><span>Shipping (free over $100)</span><span>{money(b.ship)}</span></div>
  <div className="row"><span>Tax (5%)</span><span>{money(b.tax)}</span></div>
  <div className="row total"><span>Total</span><span>{money(b.total)}</span></div>
  <Link className="btn" href="/checkout">Go to checkout</Link></aside></div>}
