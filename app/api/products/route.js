import {getProducts} from '@/lib/db';
export const dynamic='force-dynamic';
export const GET=()=>Response.json(getProducts());
