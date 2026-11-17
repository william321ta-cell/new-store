import crypto from 'crypto';import {cookies} from 'next/headers';import {getUsers} from './db';
const S=process.env.AUTH_SECRET||'dev-secret-change-me';
const sign=v=>crypto.createHmac('sha256',S).update(v).digest('hex');
export const hash=(p,salt)=>crypto.scryptSync(p,salt,64).toString('hex');
export const setSession=id=>cookies().set('sid',id+'.'+sign(id),{httpOnly:true,sameSite:'lax',path:'/',maxAge:604800});
export function getUser(){const c=cookies().get('sid')?.value;if(!c)return null;const [id,sig]=c.split('.');
 const ok=sig&&sig.length===64&&crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(sign(id)));
 return ok?getUsers().find(u=>u.id===id)||null:null}
