export const bill=l=>{const sub=l.reduce((s,x)=>s+x.price*x.qty,0);const ship=sub>100||!sub?0:9;const tax=+(sub*.05).toFixed(2);return{sub:+sub.toFixed(2),ship,tax,total:+(sub+ship+tax).toFixed(2)}};
export const money=n=>'$'+Number(n).toFixed(2);
