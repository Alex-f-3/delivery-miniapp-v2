// FILE: app.js
import { CATEGORIES,LOCAL_MENU } from "./data.js";
import { state,setState,loadState } from "./state.js";
import { addToCart,subtotal,clearCart } from "./cart.js";
import { getMenu,postOrder } from "./api.js";
import { isAdmin } from "./auth.js";
import { openAdmin } from "./admin.js";
import { startTracking } from "./tracking.js";
import { formatVND } from "./utils.js";

loadState();

const tg=window.Telegram.WebApp;
tg.ready();
state.telegram=tg.initDataUnsafe.user;

if(isAdmin(state.telegram?.id)){
document.getElementById("adminBtn").classList.remove("hidden");
document.getElementById("adminBtn").onclick=openAdmin;
}

const loadMenu=async()=>{
try{
const remote=await getMenu();
if(!state.menu || remote.lastUpdate!==state.menu.lastUpdate){
setState("menu",remote);
render();
}
}catch{
if(!state.menu){
setState("menu",LOCAL_MENU);
}
render();
}
};

const render=()=>{
const app=document.getElementById("app");
app.innerHTML="";
CATEGORIES.forEach(cat=>{
const items=state.menu.items.filter(i=>i.category===cat);
if(!items.length) return;
const section=document.createElement("div");
section.className="category";
section.innerHTML=`<h2>${cat}</h2>`;
items.forEach(i=>{
const card=document.createElement("div");
card.className="card "+(!i.available?"unavailable":"");
card.innerHTML=`
<div>${i.name}</div>
<div>${formatVND(i.price)}</div>
<button ${!i.available?"disabled":""}>Add</button>
`;
card.querySelector("button").onclick=()=>{
addToCart(i);
updateCartUI();
};
section.appendChild(card);
});
app.appendChild(section);
});
};

const updateCartUI=()=>{
document.getElementById("cartCount").innerText=state.cart.length;
document.getElementById("cartFloatingBtn").classList.toggle("hidden",state.cart.length===0);
};

document.getElementById("cartFloatingBtn").onclick=()=>{
const modal=document.getElementById("modalRoot");
modal.innerHTML=`
<div class="modal">
<div class="modal-content">
<h3>Your Cart</h3>
${state.cart.map(i=>`
<div>${i.name} x${i.qty} - ${formatVND(i.price*i.qty)}</div>
`).join("")}
<hr/>
<div>Subtotal: ${formatVND(subtotal())}</div>
<select id="district">
<option value="">Select district</option>
<option value="South" data-price="50000">South - 50 000 VND</option>
<option value="North" data-price="50000">North - 50 000 VND</option>
<option value="Center" data-price="40000">Center - 40 000 VND</option>
</select>
<input id="address" placeholder="Delivery address"/>
<button class="primary-btn" id="placeOrder">Place Order</button>
</div>
</div>
`;

document.getElementById("placeOrder").onclick=async()=>{
const districtSelect=document.getElementById("district");
const option=districtSelect.options[districtSelect.selectedIndex];
if(!option.value) return;
const delivery=+option.dataset.price;
const total=subtotal()+delivery;

const payload={
telegram:state.telegram,
address:document.getElementById("address").value,
district:option.value,
cart:state.cart,
subtotal:subtotal(),
delivery,
total,
timestamp:Date.now()
};

const res=await postOrder(payload);
setState("orderId",res.orderId);
setState("status",res.status);
clearCart();
modal.innerHTML="";
startTracking();
};
};

setInterval(loadMenu,60000);
loadMenu();
updateCartUI();