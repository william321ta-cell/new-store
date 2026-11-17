import Link from 'next/link';import {getUser} from '@/lib/auth';import {CartLink,Logout} from './Bits';
export default function Navbar(){const u=getUser();
 return <header className="nav"><Link href="/" className="logo">Stockroom</Link>
  <nav><Link href="/">Shop</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
  {u?<><Link href="/orders">My orders</Link><Logout/></>:<Link href="/login">Log in</Link>}<CartLink/></nav></header>}
