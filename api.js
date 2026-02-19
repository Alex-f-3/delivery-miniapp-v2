// TEMP OFFLINE MODE

export const getMenu = async () => {
  return {
    items: [],
    lastUpdate: Date.now()
  };
};

export const postOrder = async (data) => {
  return {
    orderId: Date.now(),
    status: "pending"
  };
};

export const getOrderStatus = async () => {
  return {
    status: "pending"
  };
};

export const updateMenu = async () => {
  return { success: true };
};
