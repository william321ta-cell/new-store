import {redirect} from 'next/navigation';import Link from 'next/link';import {getUser} from '@/lib/auth';import {getOrders} from '@/lib/db';import {money} from '@/lib/pricing';
export const dynamic='force-dynamic';
export default function Orders({searchParams}){const u=getUser();if(!u)redirect('/login?next=/orders');
 const os=getOrders().filter(o=>o.userId===u.id).reverse();
 return <><h1 style={{fontSize:'2.4rem'}}>My orders</h1>
 {searchParams.placed&&<p className="card" role="status">Order {searchParams.placed} placed. Thank you, {u.name}.</p>}
 {!os.length&&<p>You haven’t ordered yet. <Link href="/">Browse products</Link></p>}
 {os.map(o=><section className="card" key={o.id} style={{marginTop:16}}><div className="row"><b>{o.id}</b><span className="mut">{new Date(o.date).toLocaleDateString()} · {o.status}</span></div>
 {JSON.parse(o.items).map(l=><div className="row" key={l.id}><span>{l.qty} × {l.name}</span><span>{money(l.price*l.qty)}</span></div>)}
 <div className="row total"><span>Total ({o.card})</span><span>{money(o.total)}</span></div></section>)}</>}
