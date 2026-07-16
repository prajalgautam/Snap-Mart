import axios from "axios";
import config from "../config/config.js";

const payViaKhalti = async (data) => {
  // Khalti expects amount in paisa (multiply by 100)
  const body = {
    return_url: `${config.khalti.returnUrl}/${data.id}`,
    website_url: config.appUrl,
    amount: data.amount * 100,
    purchase_order_id: data.purchaseOrderId,
    purchase_order_name: data.purchaseOrderName,
    customer_info: data.customerInfo,
  };

  const response = await axios.post(config.khalti.apiUrl, body, {
    headers: {
      Authorization: `Key ${config.khalti.secretKey}`,
    },
  });

  return response.data;
};

export { payViaKhalti };
