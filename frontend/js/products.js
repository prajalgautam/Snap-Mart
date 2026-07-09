const productGrid = document.querySelector("[data-product-grid]");

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";
  article.innerHTML = `
    <div class="product-image ${product.imageClass}"></div>
    <span>${product.vendor}</span>
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <div class="product-meta">
      <strong>${formatCurrency(product.price)}</strong>
      <small>${product.inventory} in stock</small>
    </div>
    <button class="secondary-btn product-action" type="button">View Details</button>
  `;

  return article;
}

if (productGrid) {
  productGrid.innerHTML = products.map(createProductCard).map((card) => card.outerHTML).join("");
}
