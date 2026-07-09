const paymentForm = document.querySelector("[data-payment-form]");
const paymentDetails = document.querySelector("[data-payment-details]");
const paymentMessage = document.querySelector("[data-payment-message]");
const checkoutKey = "snapmart-checkout";
const ordersKey = "snapmart-orders";

function readCheckoutDraft() {
  try {
    return JSON.parse(localStorage.getItem(checkoutKey));
  } catch (error) {
    return null;
  }
}

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(ordersKey)) || [];
  } catch (error) {
    return [];
  }
}

function savePaidOrder(order, paymentMethod) {
  const paidOrder = {
    ...order,
    status: "Paid",
    payment: {
      method: paymentMethod,
      reference: `PAY-${Date.now()}`,
      paidAt: new Date().toISOString(),
    },
  };

  localStorage.setItem(ordersKey, JSON.stringify([paidOrder, ...readOrders()]));
  localStorage.removeItem(checkoutKey);
  clearCart();

  return paidOrder;
}

function renderPaymentDetails() {
  const draft = readCheckoutDraft();

  if (!draft && paymentDetails) {
    paymentDetails.innerHTML = `
      <p>No checkout draft found. Start from your cart to continue payment.</p>
      <a class="primary-btn summary-action" href="./cart.html">Go to Cart</a>
    `;
    if (paymentForm) paymentForm.hidden = true;
    return;
  }

  if (paymentDetails) {
    paymentDetails.innerHTML = `
      <dl>
        <div>
          <dt>Order</dt>
          <dd>${draft.id}</dd>
        </div>
        <div>
          <dt>Customer</dt>
          <dd>${draft.customer.name}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>${formatCurrency(draft.summary.total)}</dd>
        </div>
      </dl>
    `;
  }
}

if (paymentForm) {
  renderPaymentDetails();

  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const draft = readCheckoutDraft();

    if (!draft) {
      paymentMessage.textContent = "Checkout draft is missing.";
      return;
    }

    const formData = new FormData(paymentForm);
    const method = String(formData.get("paymentMethod") || "Digital Wallet");
    const paidOrder = savePaidOrder(draft, method);

    paymentMessage.textContent = `Payment successful for ${paidOrder.id}. Redirecting to orders...`;
    setTimeout(() => {
      window.location.href = "./orders.html";
    }, 900);
  });
}
