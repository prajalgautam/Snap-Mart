const cartStorageKey = "snapmart-cart";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(cartStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

function writeCart(cartItems) {
  localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
}

function getCartProducts() {
  return readCart()
    .map((item) => {
      const product = products.find((savedProduct) => savedProduct.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);
}

function addToCart(productId) {
  const cartItems = readCart();
  const savedItem = cartItems.find((item) => item.id === productId);

  if (savedItem) {
    savedItem.quantity += 1;
  } else {
    cartItems.push({ id: productId, quantity: 1 });
  }

  writeCart(cartItems);
}

function updateCartQuantity(productId, quantity) {
  const nextQuantity = Number(quantity);
  const cartItems = readCart()
    .map((item) =>
      item.id === productId ? { ...item, quantity: nextQuantity } : item,
    )
    .filter((item) => item.quantity > 0);

  writeCart(cartItems);
}

function removeFromCart(productId) {
  writeCart(readCart().filter((item) => item.id !== productId));
}

function clearCart() {
  writeCart([]);
}

function getCartSummary(cartProducts = getCartProducts()) {
  const subtotal = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  const deliveryFee = subtotal > 0 ? 120 : 0;
  const serviceFee = Math.round(subtotal * 0.03);

  return {
    subtotal,
    deliveryFee,
    serviceFee,
    total: subtotal + deliveryFee + serviceFee,
  };
}
