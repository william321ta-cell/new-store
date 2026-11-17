import Link from 'next/link';import {getProducts} from '@/lib/db';import {money} from '@/lib/pricing';import {AddButton} from '@/components/Bits';
export const dynamic='force-dynamic';
export default function Home(){const ps=getProducts();
 return <><h1>Stock your site.<br/>Ship in days.</h1><p className="mut">Shelving, tools, safety gear and packing supplies for warehouses and workshops.</p>
 <div className="grid">{ps.map(p=><article className="card" key={p.id}>
  <Link href={`/products/${p.id}`}><div className="pic" aria-hidden>{p.emoji}</div><h3>{p.name}</h3></Link>
  <span className="mut">{p.category} · {p.stock>0?`${p.stock} in stock`:'Out of stock'}</span>
  <span className="price">{money(p.price)}</span><AddButton id={p.id} disabled={p.stock<1}/></article>)}</div></>}
