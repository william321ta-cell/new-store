'use client';
import {useRouter} from 'next/navigation';import {useState} from 'react';import {useCart} from './Cart';
export function CartLink(){const {count}=useCart();return <a href="/cart" className="cartlink">Cart <b>{count}</b></a>}
export function Logout(){const r=useRouter();return <button className="link" onClick={async()=>{await fetch('/api/auth',{method:'DELETE'});r.push('/');r.refresh()}}>Log out</button>}
export function AddButton({id,disabled}){const {add}=useCart();const [ok,setOk]=useState(false);
 return <button className="btn" disabled={disabled} onClick={()=>{add(id);setOk(true);setTimeout(()=>setOk(false),1200)}}>{disabled?'Out of stock':ok?'Added to cart':'Add to cart'}</button>}
