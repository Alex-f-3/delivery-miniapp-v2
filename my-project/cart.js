// FILE: cart.js
import { state,setState } from "./state.js";

export const addToCart=(item)=>{
const existing=state.cart.find(i=>i.id===item.id);
if(existing){existing.qty++;}
else{state.cart.push({...item,qty:1});}
setState("cart",state.cart);
};

export const removeFromCart=(id)=>{
state.cart=state.cart.filter(i=>i.id!==id);
setState("cart",state.cart);
};

export const subtotal=()=>state.cart.reduce((a,b)=>a+b.price*b.qty,0);

export const clearCart=()=>{
state.cart=[];
setState("cart",[]);
};