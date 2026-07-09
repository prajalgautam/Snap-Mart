const cartItemsElement = document.querySelector("[data-cart-items]");
const cartEmptyElement = document.querySelector("[data-cart-empty]");
const cartSubtotalElement = document.querySelector("[data-cart-subtotal]");
const cartDeliveryElement = document.querySelector("[data-cart-delivery]");
const cartServiceElement = document.querySelector("[data-cart-service]");
const cartTotalElement = document.querySelector("[data-cart-total]");

function createCartItem(product) {
  const article = document.createElement("article");
  article.className = "cart-item";
  article.innerHTML = `
    <div>
      <span>${product.vendor}</span>
      <h3>${product.name}</h3>
      <p>${formatCurrency(product.price)} each</p>
    </div>
    <div class="cart-controls">
      <label>
        Qty
        <input type="number" min="1" value="${product.quantity}" data-cart-quantity="${product.id}" />
      </label>
      <button class="secondary-btn" type="button" data-remove-item="${product.id}">Remove</button>
    </div>
  `;

  return article;
}

function renderCart() {
  const cartProducts = getCartProducts();
  const summary = getCartSummary(cartProducts);

  if (cartItemsElement) {
    cartItemsElement.innerHTML = cartProducts
      .map(createCartItem)
      .map((item) => item.outerHTML)
      .join("");
  }

  if (cartEmptyElement) {
    cartEmptyElement.hidden = cartProducts.length > 0;
  }

  if (cartSubtotalElement) cartSubtotalElement.textContent = formatCurrency(summary.subtotal);
  if (cartDeliveryElement) cartDeliveryElement.textContent = formatCurrency(summary.deliveryFee);
  if (cartServiceElement) cartServiceElement.textContent = formatCurrency(summary.serviceFee);
  if (cartTotalElement) cartTotalElement.textContent = formatCurrency(summary.total);
}

if (cartItemsElement) {
  cartItemsElement.addEventListener("input", (event) => {
    const productId = event.target.dataset.cartQuantity;

    if (!productId) return;

    updateCartQuantity(productId, event.target.value);
    renderCart();
  });

  cartItemsElement.addEventListener("click", (event) => {
    const productId = event.target.dataset.removeItem;

    if (!productId) return;

    removeFromCart(productId);
    renderCart();
  });

  renderCart();
}
