// FILE: tracking.js
import { state,setState } from "./state.js";
import { getOrderStatus } from "./api.js";

let interval=null;

export const startTracking=()=>{
if(!state.orderId) return;
interval=setInterval(async()=>{
const res=await getOrderStatus(state.orderId);
if(res.status && res.status!==state.status){
setState("status",res.status);
renderTracking();
}
},30000);
};

export const renderTracking=()=>{
const modal=document.getElementById("modalRoot");
modal.innerHTML=`
<div class="modal">
<div class="modal-content">
<h3>Order Status</h3>
<div class="progress">
${["pending","confirmed","cooking","delivering","completed"].map(s=>`
<div class="step ${state.status===s?"active":""}">${s}</div>
`).join("")}
</div>
</div>
</div>
`;
};