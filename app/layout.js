import './globals.css';import {CartProvider} from '@/components/Cart';import Navbar from '@/components/Navbar';
export const metadata={title:'Stockroom – buy stock online',description:'Order shelving, tools, safety gear and packing supplies.'};
export default function L({children}){return <html lang="en"><body><CartProvider><Navbar/><main>{children}</main>
 <footer>© Stockroom. Orders ship in 2–4 working days.</footer></CartProvider></body></html>}
