import fs from 'fs';import path from 'path';import * as XLSX from 'xlsx';
// Vercel's deployed filesystem is read-only except /tmp, so store data there in production.
const D=process.env.VERCEL?path.join('/tmp','data'):path.join(process.cwd(),'data'),f=n=>path.join(D,n);
const SEED=[['Steel Shelving Unit','Storage',89,40,'🗄️','5-tier powder-coated shelving, 200 kg per shelf.'],['Cordless Drill Kit','Tools',129,25,'🔧','18V brushless drill, two batteries, 40 bits.'],['Safety Helmet','Safety',24,120,'⛑️','EN 397 certified, adjustable harness.'],['Pallet Jack','Handling',319,8,'🚜','2500 kg manual pallet jack, nylon wheels.'],['Packing Tape (36 rolls)','Packing',32,200,'📦','48 mm x 100 m, low-noise acrylic.'],['LED Work Light','Lighting',45,60,'💡','Rechargeable 3000 lm light with magnetic stand.'],
['Work Gloves (12 pairs)','Safety',28,150,'🧤','Cut-resistant nitrile-coated gloves, sizes M-XL.'],['Folding Hand Truck','Handling',74,30,'🛒','Aluminium frame, 150 kg capacity, folds flat for storage.'],['Cable Tie Assortment','Packing',14,300,'🔗','1000 pieces, UV-resistant, assorted sizes.'],['Impact Wrench','Tools',199,15,'🔩','1/2 inch cordless impact wrench, 650 Nm torque.'],['Storage Bins (20 pack)','Storage',56,70,'🧰','Stackable plastic bins with lids.'],['Safety Goggles','Safety',9,0,'🥽','Anti-fog, impact-rated eye protection.']].map((r,i)=>({id:i+1,name:r[0],category:r[1],price:r[2],stock:r[3],emoji:r[4],description:r[5]}));
const mk=()=>{try{fs.mkdirSync(D,{recursive:true})}catch{}};
const rd=(file,seed=[])=>{mk();try{if(!fs.existsSync(f(file)))wr(file,seed);const wb=XLSX.readFile(f(file));return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])}catch{return seed}};
const wr=(file,rows)=>{const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(rows),'Sheet1');XLSX.writeFile(wb,f(file))};
const rj=file=>{mk();try{return JSON.parse(fs.readFileSync(f(file),'utf8'))}catch{return[]}};
const wj=(file,d)=>{mk();fs.writeFileSync(f(file),JSON.stringify(d,null,2))};
export const getProducts=()=>rd('products.xlsx',SEED);
export const saveProducts=r=>wr('products.xlsx',r);
export const getOrders=()=>rd('orders.xlsx');
export const saveOrders=r=>wr('orders.xlsx',r);
export const getUsers=()=>rj('users.json');
export const saveUsers=d=>wj('users.json',d);
export const getMessages=()=>rj('messages.json');
export const saveMessages=d=>wj('messages.json',d);
