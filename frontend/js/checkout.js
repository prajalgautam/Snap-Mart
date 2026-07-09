const checkoutForm = document.querySelector("[data-checkout-form]");
const checkoutItemsElement = document.querySelector("[data-checkout-items]");
const checkoutSubtotalElement = document.querySelector("[data-checkout-subtotal]");
const checkoutDeliveryElement = document.querySelector("[data-checkout-delivery]");
const checkoutServiceElement = document.querySelector("[data-checkout-service]");
const checkoutTotalElement = document.querySelector("[data-checkout-total]");
const checkoutMessageElement = document.querySelector("[data-checkout-message]");
const checkoutStorageKey = "snapmart-checkout";

function renderCheckoutSummary() {
  const cartProducts = getCartProducts();
  const summary = getCartSummary(cartProducts);

  if (checkoutItemsElement) {
    checkoutItemsElement.innerHTML = cartProducts
      .map(
        (product) => `
          <li>
            <span>${product.name} x ${product.quantity}</span>
            <strong>${formatCurrency(product.price * product.quantity)}</strong>
          </li>
        `,
      )
      .join("");
  }

  if (checkoutSubtotalElement) checkoutSubtotalElement.textContent = formatCurrency(summary.subtotal);
  if (checkoutDeliveryElement) checkoutDeliveryElement.textContent = formatCurrency(summary.deliveryFee);
  if (checkoutServiceElement) checkoutServiceElement.textContent = formatCurrency(summary.serviceFee);
  if (checkoutTotalElement) checkoutTotalElement.textContent = formatCurrency(summary.total);
}

function saveCheckoutDraft(formData) {
  const cartProducts = getCartProducts();
  const summary = getCartSummary(cartProducts);
  const draftOrder = {
    id: `SM-${Date.now()}`,
    status: "Awaiting payment",
    customer: {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      address: String(formData.get("address") || "").trim(),
      instructions: String(formData.get("instructions") || "").trim(),
    },
    items: cartProducts.map((product) => ({
      id: product.id,
      name: product.name,
      vendor: product.vendor,
      price: product.price,
      quantity: product.quantity,
    })),
    summary,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(checkoutStorageKey, JSON.stringify(draftOrder));
}

if (checkoutForm) {
  renderCheckoutSummary();

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (getCartProducts().length === 0) {
      checkoutMessageElement.textContent = "Add products to your cart before checkout.";
      return;
    }

    saveCheckoutDraft(new FormData(checkoutForm));
    window.location.href = "./payment.html";
  });
}
