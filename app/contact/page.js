'use client';
import {useState} from 'react';
export default function Contact(){const [v,setV]=useState({});const [m,setM]=useState('');const [bad,setBad]=useState(false);
 async function go(e){e.preventDefault();const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(v)});const d=await r.json();setBad(!r.ok);setM(r.ok?'Message sent. We reply within one working day.':d.error);if(r.ok)setV({})}
 const s=k=>e=>setV({...v,[k]:e.target.value});
 return <form onSubmit={go} style={{maxWidth:480}}><h1 style={{fontSize:'2.4rem'}}>Contact us</h1>
 <label>Name<input value={v.name||''} onChange={s('name')} required/></label><label>Email<input type="email" value={v.email||''} onChange={s('email')} required/></label>
 <label>Message<textarea rows={5} value={v.message||''} onChange={s('message')} required/></label>
 {m&&<p className={bad?'err':''} role="status">{m}</p>}<button className="btn">Send message</button></form>}
