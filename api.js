const BASE = "https://aleha.app.n8n.cloud/webhook-test/order";

export const getMenu = () =>
  fetch(`${BASE}/menu`).then(r => r.json());

export const postOrder = (data) =>
  fetch(`${BASE}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());

export const getOrderStatus = (orderId) =>
  fetch(`${BASE}/order-status?orderId=${orderId}`)
    .then(r => r.json());

export const updateMenu = (menu) =>
  fetch(`${BASE}/update-menu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(menu)
  }).then(r => r.json());

