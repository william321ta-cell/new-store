'use client';
import {createContext,useContext,useEffect,useState} from 'react';
const C=createContext(null);export const useCart=()=>useContext(C);
export function CartProvider({children}){
 const [items,set]=useState([]);const [ready,setReady]=useState(false);
 useEffect(()=>{try{set(JSON.parse(localStorage.getItem('cart')||'[]'))}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem('cart',JSON.stringify(items))},[items,ready]);
 const add=(id,n=1)=>set(a=>a.some(i=>i.id===id)?a.map(i=>i.id===id?{...i,qty:i.qty+n}:i):[...a,{id,qty:n}]);
 const setQty=(id,q)=>set(a=>q<1?a.filter(i=>i.id!==id):a.map(i=>i.id===id?{...i,qty:q}:i));
 const remove=id=>set(a=>a.filter(i=>i.id!==id));
 return <C.Provider value={{items,add,setQty,remove,clear:()=>set([]),count:items.reduce((s,i)=>s+i.qty,0)}}>{children}</C.Provider>}
