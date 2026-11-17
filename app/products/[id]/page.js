import Link from 'next/link';import {notFound} from 'next/navigation';import {getProducts} from '@/lib/db';import {money} from '@/lib/pricing';import {AddButton} from '@/components/Bits';
export const dynamic='force-dynamic';
export default function P({params}){const p=getProducts().find(x=>x.id==params.id);if(!p)notFound();
 return <><Link href="/" className="mut">Back to all products</Link>
 <div className="detail" style={{marginTop:16}}><div className="pic" aria-hidden>{p.emoji}</div>
 <div><h1 style={{fontSize:'2.4rem'}}>{p.name}</h1><p className="mut">{p.category}</p><p>{p.description}</p>
 <p className="price">{money(p.price)}</p><p className="mut">{p.stock>0?`${p.stock} units in stock`:'Currently out of stock'}</p>
 <AddButton id={p.id} disabled={p.stock<1}/></div></div></>}
