const productGrid = document.querySelector("[data-product-grid]");
const productSearch = document.querySelector("[data-product-search]");
const emptyProducts = document.querySelector("[data-empty-products]");

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

function productMatchesSearch(product, query, category) {
  const normalizedQuery = query.trim().toLowerCase();
  const searchableText = [
    product.name,
    product.vendor,
    product.category,
    product.description,
  ]
    .join(" ")
    .toLowerCase();

  const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
  const matchesCategory = !category || product.category === category;

  return matchesQuery && matchesCategory;
}

function renderProducts(productList) {
  productGrid.innerHTML = productList
    .map(createProductCard)
    .map((card) => card.outerHTML)
    .join("");

  if (emptyProducts) {
    emptyProducts.hidden = productList.length > 0;
  }
}

function updateProductResults() {
  const formData = new FormData(productSearch);
  const query = String(formData.get("query") || "");
  const category = String(formData.get("category") || "");
  const filteredProducts = products.filter((product) =>
    productMatchesSearch(product, query, category),
  );

  renderProducts(filteredProducts);
}

if (productGrid) {
  renderProducts(products);
}

if (productSearch) {
  productSearch.addEventListener("input", updateProductResults);
  productSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    updateProductResults();
  });
}
