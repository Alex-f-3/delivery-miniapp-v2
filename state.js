// FILE: state.js
export const state = {
menu:null,
cart:[],
orderId:null,
status:null,
telegram:null
};

export const setState = (key,value)=>{
state[key]=value;
localStorage.setItem(key,JSON.stringify(value));
};

export const loadState = ()=>{
["menu","cart","orderId"].forEach(k=>{
const v=localStorage.getItem(k);
if(v) state[k]=JSON.parse(v);
});
};