import {getMessages,saveMessages} from '@/lib/db';
export async function POST(req){const {name,email,message}=await req.json();
 if(!name?.trim()||!/^\S+@\S+\.\S+$/.test(email||'')||!message?.trim())return Response.json({error:'Fill in your name, a valid email and a message.'},{status:400});
 saveMessages([...getMessages(),{name:name.trim(),email,message:message.trim(),date:new Date().toISOString()}]);
 return Response.json({ok:true})}
