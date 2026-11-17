'use client';
import {useRouter,useSearchParams} from 'next/navigation';import {Suspense,useState} from 'react';
function Form(){const r=useRouter();const next=useSearchParams().get('next')||'/orders';const [mode,setMode]=useState('login');const [v,setV]=useState({});const [err,setErr]=useState('');
 async function go(e){e.preventDefault();setErr('');const res=await fetch('/api/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...v,mode})});
  const d=await res.json();if(!res.ok)return setErr(d.error);r.push(next.startsWith('/')?next:'/');r.refresh()}
 const set=k=>e=>setV({...v,[k]:e.target.value});
 return <form onSubmit={go} style={{maxWidth:380}}><h1 style={{fontSize:'2.4rem'}}>{mode==='login'?'Log in':'Create account'}</h1>
 {mode==='signup'&&<label>Name<input onChange={set('name')} required autoComplete="name"/></label>}
 <label>Email<input type="email" onChange={set('email')} required autoComplete="email"/></label>
 <label>Password<input type="password" minLength={8} onChange={set('password')} required autoComplete={mode==='login'?'current-password':'new-password'}/></label>
 {err&&<p className="err" role="alert">{err}</p>}<button className="btn">{mode==='login'?'Log in':'Sign up'}</button>
 <button type="button" className="link" onClick={()=>{setMode(mode==='login'?'signup':'login');setErr('')}}>{mode==='login'?'New here? Create an account':'Have an account? Log in'}</button></form>}
export default function Login(){return <Suspense><Form/></Suspense>}
