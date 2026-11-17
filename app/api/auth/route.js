import crypto from 'crypto';import {cookies} from 'next/headers';
import {getUsers,saveUsers} from '@/lib/db';import {hash,setSession,getUser} from '@/lib/auth';
const err=(m,s=400)=>Response.json({error:m},{status:s});
export async function GET(){const u=getUser();return Response.json(u?{id:u.id,name:u.name,email:u.email,addresses:u.addresses||[],cards:u.cards||[]}:null)}
export async function DELETE(){cookies().delete('sid');return Response.json({ok:true})}
export async function POST(req){
 const {mode,name,email,password}=await req.json();const e=String(email||'').trim().toLowerCase();
 if(!/^\S+@\S+\.\S+$/.test(e))return err('Enter a valid email address.');
 if(String(password||'').length<8)return err('Password must be at least 8 characters.');
 const users=getUsers();
 if(mode==='signup'){
  if(!String(name||'').trim())return err('Enter your name.');
  if(users.some(u=>u.email===e))return err('An account with this email already exists.',409);
  const salt=crypto.randomBytes(16).toString('hex');
  const u={id:crypto.randomUUID(),name:name.trim(),email:e,salt,hash:hash(password,salt),addresses:[],cards:[],created:new Date().toISOString()};
  saveUsers([...users,u]);setSession(u.id);return Response.json({ok:true});
 }
 const u=users.find(x=>x.email===e);
 if(!u||hash(password,u.salt)!==u.hash)return err('Email or password is incorrect.',401);
 setSession(u.id);return Response.json({ok:true});
}
