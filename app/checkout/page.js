'use client';
import Link from 'next/link';import {useRouter} from 'next/navigation';import {useEffect,useState} from 'react';
import {useCart} from '@/components/Cart';import {bill,money} from '@/lib/pricing';
const F=({l,n,v,s,...r})=><label>{l}<input name={n} value={v[n]||''} onChange={e=>s({...v,[n]:e.target.value})} required {...r}/></label>;
export default function Checkout(){const r=useRouter();const {items,clear}=useCart();
 const [me,setMe]=useState();const [ps,setPs]=useState();const [a,setA]=useState({country:'Pakistan'});const [c,setC]=useState({});const [err,setErr]=useState('');const [busy,setBusy]=useState(false);
 useEffect(()=>{fetch('/api/auth').then(r=>r.json()).then(u=>{setMe(u||null);if(u?.addresses?.[0])setA(u.addresses[0]);if(u?.cards?.[0])setC({holder:u.cards[0].holder})});fetch('/api/products').then(r=>r.json()).then(setPs)},[]);
 if(me===undefined||!ps)return <p>Loading…</p>;
 if(!me)return <><h1 style={{fontSize:'2.4rem'}}>Log in to check out</h1><Link className="btn" href="/login?next=/checkout">Log in or sign up</Link></>;
 const lines=items.map(i=>{const p=ps.find(x=>x.id===i.id);return p&&{...p,qty:i.qty}}).filter(Boolean);const b=bill(lines);
 if(!lines.length)return <><h1 style={{fontSize:'2.4rem'}}>Nothing to check out</h1><Link className="btn" href="/">Browse products</Link></>;
 async function submit(e){e.preventDefault();setBusy(true);setErr('');
  const res=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items,address:a,card:c})});
  const d=await res.json();setBusy(false);if(!res.ok)return setErr(d.error);clear();r.push('/orders?placed='+d.id)}
 return <form onSubmit={submit} className="two"><div style={{display:'grid',gap:12}}>
  <h2>Delivery address</h2><F l="Full name" n="name" v={a} s={setA} autoComplete="name"/><F l="Address" n="line1" v={a} s={setA} autoComplete="address-line1"/>
  <div className="cols"><F l="City" n="city" v={a} s={setA}/><F l="Postal code" n="zip" v={a} s={setA}/></div><F l="Country" n="country" v={a} s={setA}/>
  <h2>Payment</h2><F l="Name on card" n="holder" v={c} s={setC} autoComplete="cc-name"/>
  <F l="Card number" n="number" v={c} s={setC} inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242"/>
  <div className="cols"><F l="Expiry (MM/YY)" n="exp" v={c} s={setC} autoComplete="cc-exp" placeholder="08/28"/><F l="Security code" n="cvv" v={c} s={setC} inputMode="numeric" autoComplete="cc-csc" type="password"/></div>
  <p className="mut">We keep only the last 4 digits and expiry for your account. The full number and code are never saved.</p></div>
  <aside className="card"><h2>Order</h2>{lines.map(l=><div className="row" key={l.id}><span>{l.qty} × {l.name}</span><span>{money(l.price*l.qty)}</span></div>)}
  <div className="row total"><span>Total</span><span>{money(b.total)}</span></div>
  {err&&<p className="err" role="alert">{err}</p>}<button className="btn" disabled={busy}>{busy?'Placing order…':'Place order'}</button></aside></form>}
