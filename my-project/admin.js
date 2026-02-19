// FILE: admin.js
import { state } from "./state.js";
import { updateMenu } from "./api.js";

export const openAdmin=()=>{
const modal=document.getElementById("modalRoot");
modal.innerHTML=`
<div class="modal">
<div class="modal-content">
<h3>Admin Panel</h3>
${state.menu.items.map(i=>`
<div>
${i.name}
<input type="number" value="${i.price}" data-id="${i.id}" class="priceInput"/>
<label>
<input type="checkbox" ${i.available?"checked":""} data-id="${i.id}" class="toggleInput"/> Available
</label>
</div>
`).join("")}
<button class="primary-btn" id="saveMenu">Save</button>
</div>
</div>
`;

document.getElementById("saveMenu").onclick=async()=>{
document.querySelectorAll(".priceInput").forEach(inp=>{
const id=+inp.dataset.id;
state.menu.items.find(i=>i.id===id).price=+inp.value;
});
document.querySelectorAll(".toggleInput").forEach(inp=>{
const id=+inp.dataset.id;
state.menu.items.find(i=>i.id===id).available=inp.checked;
});
await updateMenu(state.menu);
modal.innerHTML="";
};
};