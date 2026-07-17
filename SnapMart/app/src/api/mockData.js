const MOCK_IMG = (id) =>
  `https://picsum.photos/seed/snapmart${id}/400/300`;

export const SAMPLE_PRODUCTS = [
  {
    _id: "prod-001",
    name: "Fresh Vegetables Combo Pack",
    brand: "Local Farms Nepal",
    category: "Groceries",
    price: 350,
    stock: 50,
    imageUrls: [MOCK_IMG("veg")],
    description:
      "Fresh farm vegetables directly from local suppliers in Kathmandu valley. Includes seasonal greens, tomatoes, potatoes, onions, and more.",
    createdAt: "2026-07-01T00:00:00.000Z",
  },
  {
    _id: "prod-002",
    name: "Dairy Essentials Bundle",
    brand: "Daily Fresh Dairy",
    category: "Groceries",
    price: 580,
    stock: 30,
    imageUrls: [MOCK_IMG("dairy")],
    description:
      "Fresh milk, yogurt, paneer, and butter from local Nepali dairies. Delivered chilled.",
    createdAt: "2026-07-02T00:00:00.000Z",
  },
  {
    _id: "prod-003",
    name: "Basic Medicine Kit",
    brand: "HealthPlus Nepal",
    category: "Pharmacy",
    price: 299,
    stock: 100,
    imageUrls: [MOCK_IMG("med")],
    description:
      "Essential medicine kit with paracetamol, antiseptic, bandages, and common cold remedies.",
    createdAt: "2026-07-03T00:00:00.000Z",
  },
  {
    _id: "prod-004",
    name: "Premium Notebook Set",
    brand: "StudyMate Stationery",
    category: "Stationery",
    price: 180,
    stock: 200,
    imageUrls: [MOCK_IMG("notebook")],
    description:
      "Pack of 5 quality A4 notebooks with hard covers, perfect for school and office use.",
    createdAt: "2026-07-04T00:00:00.000Z",
  },
  {
    _id: "prod-005",
    name: "Organic Rice 5kg",
    brand: "Nepal Organic",
    category: "Groceries",
    price: 650,
    stock: 40,
    imageUrls: [MOCK_IMG("rice")],
    description:
      "Premium organic rice grown in the fertile fields of Jhapa, Nepal.",
    createdAt: "2026-07-05T00:00:00.000Z",
  },
  {
    _id: "prod-006",
    name: "Cooking Oil 3L",
    brand: "PureNepal",
    category: "Groceries",
    price: 720,
    stock: 25,
    imageUrls: [MOCK_IMG("oil")],
    description:
      "Refined soybean cooking oil, 3 litre bottle. Perfect for daily cooking.",
    createdAt: "2026-07-06T00:00:00.000Z",
  },
  {
    _id: "prod-007",
    name: "Hand Sanitizer Pack",
    brand: "HealthPlus Nepal",
    category: "Pharmacy",
    price: 150,
    stock: 150,
    imageUrls: [MOCK_IMG("sanitizer")],
    description:
      "Pack of 3 hand sanitizer bottles. 70% alcohol, keeps your hands germ-free.",
    createdAt: "2026-07-07T00:00:00.000Z",
  },
  {
    _id: "prod-008",
    name: "Color Pencil Set (24)",
    brand: "ArtMate",
    category: "Stationery",
    price: 250,
    stock: 75,
    imageUrls: [MOCK_IMG("pencil")],
    description:
      "24 vibrant color pencils in a sturdy case. Great for artists and students.",
    createdAt: "2026-07-08T00:00:00.000Z",
  },
  {
    _id: "prod-009",
    name: "Face Mask Box (50 pcs)",
    brand: "SafeCare",
    category: "Pharmacy",
    price: 400,
    stock: 80,
    imageUrls: [MOCK_IMG("mask")],
    description:
      "Disposable 3-ply surgical face masks. CE certified, box of 50.",
    createdAt: "2026-07-09T00:00:00.000Z",
  },
  {
    _id: "prod-010",
    name: "Spices Combo Pack",
    brand: "Masala Nepal",
    category: "Groceries",
    price: 280,
    stock: 60,
    imageUrls: [MOCK_IMG("spices")],
    description:
      "Essential Nepali spices: turmeric, cumin, coriander, chili powder, and garam masala.",
    createdAt: "2026-07-10T00:00:00.000Z",
  },
  {
    _id: "prod-011",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "Electronics",
    price: 189000,
    stock: 10,
    imageUrls: [MOCK_IMG("iphone")],
    description:
      "Apple iPhone 15 Pro Max with A17 Pro chip, 48MP camera system, titanium design, and USB-C. 256GB storage.",
    createdAt: "2026-07-11T00:00:00.000Z",
  },
  {
    _id: "prod-012",
    name: 'MacBook Air M3"',
    brand: "Apple",
    category: "Electronics",
    price: 165000,
    stock: 8,
    imageUrls: [MOCK_IMG("macbook")],
    description:
      "Apple MacBook Air with M3 chip, 15.3-inch Liquid Retina display, 18GB RAM, 512GB SSD. Midnight finish.",
    createdAt: "2026-07-12T00:00:00.000Z",
  },
  {
    _id: "prod-013",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Electronics",
    price: 159000,
    stock: 12,
    imageUrls: [MOCK_IMG("samsung")],
    description:
      "Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3, 200MP camera, S Pen, and Galaxy AI features.",
    createdAt: "2026-07-13T00:00:00.000Z",
  },
  {
    _id: "prod-014",
    name: "Dell XPS 15 Laptop",
    brand: "Dell",
    category: "Electronics",
    price: 215000,
    stock: 5,
    imageUrls: [MOCK_IMG("dell")],
    description:
      "Dell XPS 15 with Intel Core i9, 32GB RAM, 1TB SSD, NVIDIA RTX 4060, 15.6-inch OLED display.",
    createdAt: "2026-07-14T00:00:00.000Z",
  },
  {
    _id: "prod-015",
    name: "Apple iPad Pro 12.9",
    brand: "Apple",
    category: "Electronics",
    price: 145000,
    stock: 7,
    imageUrls: [MOCK_IMG("ipad")],
    description:
      "Apple iPad Pro 12.9-inch with M2 chip, Liquid Retina XDR display, 256GB, Wi-Fi + Cellular.",
    createdAt: "2026-07-15T00:00:00.000Z",
  },
  {
    _id: "prod-016",
    name: "First Aid Kit",
    brand: "HealthPlus Nepal",
    category: "Pharmacy",
    price: 890,
    stock: 20,
    imageUrls: [MOCK_IMG("firstaid")],
    description:
      "Comprehensive first aid kit with bandages, antiseptic, scissors, tweezers, and emergency blanket.",
    createdAt: "2026-07-15T00:00:00.000Z",
  },
  {
    _id: "prod-017",
    name: "Aesthetic Diary",
    brand: "ArtMate",
    category: "Stationery",
    price: 190,
    stock: 65,
    imageUrls: [MOCK_IMG("diary")],
    description: "Hardbound A5 diary with lock. 200 pages, vegan leather cover.",
    createdAt: "2026-07-14T00:00:00.000Z",
  },
  {
    _id: "prod-018",
    name: "Baby Diapers Pack",
    brand: "SafeCare",
    category: "Groceries",
    price: 650,
    stock: 40,
    imageUrls: [MOCK_IMG("diapers")],
    description:
      "Extra absorbent baby diapers, size M. Pack of 30. Dermatologist tested.",
    createdAt: "2026-07-13T00:00:00.000Z",
  },
  {
    _id: "prod-019",
    name: "Sony WH-1000XM5 Headphones",
    brand: "Sony",
    category: "Electronics",
    price: 52000,
    stock: 15,
    imageUrls: [MOCK_IMG("sony")],
    description:
      "Sony WH-1000XM5 wireless noise-cancelling headphones with 30-hour battery life and Hi-Res Audio.",
    createdAt: "2026-07-12T00:00:00.000Z",
  },
  {
    _id: "prod-020",
    name: "Mineral Water 12-pack",
    brand: "Daily Fresh",
    category: "Groceries",
    price: 360,
    stock: 100,
    imageUrls: [MOCK_IMG("water")],
    description:
      "12 bottles of natural mineral water, 1L each. Sourced from the Himalayas.",
    createdAt: "2026-07-11T00:00:00.000Z",
  },
  {
    _id: "prod-021",
    name: "Wireless Bluetooth Speaker",
    brand: "Sony",
    category: "Electronics",
    price: 8500,
    stock: 22,
    imageUrls: [MOCK_IMG("speaker")],
    description:
      "Portable wireless Bluetooth speaker with deep bass, 12-hour battery, and waterproof design.",
    createdAt: "2026-07-10T00:00:00.000Z",
  },
  {
    _id: "prod-022",
    name: "Smart Watch Pro",
    brand: "Samsung",
    category: "Electronics",
    price: 35000,
    stock: 18,
    imageUrls: [MOCK_IMG("watch")],
    description:
      "Smart watch with heart rate monitor, GPS, sleep tracking, and 7-day battery life.",
    createdAt: "2026-07-09T00:00:00.000Z",
  },
  {
    _id: "prod-023",
    name: "HP LaserJet Printer",
    brand: "HP",
    category: "Electronics",
    price: 28500,
    stock: 6,
    imageUrls: [MOCK_IMG("printer")],
    description:
      "HP LaserJet Pro wireless printer with auto-duplex printing, 40ppm, and Wi-Fi Direct.",
    createdAt: "2026-07-08T00:00:00.000Z",
  },
  {
    _id: "prod-024",
    name: "Gaming Mouse RGB",
    brand: "Dell",
    category: "Electronics",
    price: 4500,
    stock: 30,
    imageUrls: [MOCK_IMG("mouse")],
    description:
      "RGB gaming mouse with 16000 DPI, 8 programmable buttons, and braided cable.",
    createdAt: "2026-07-07T00:00:00.000Z",
  },
  {
    _id: "prod-025",
    name: "Multivitamin Tablets",
    brand: "HealthPlus Nepal",
    category: "Pharmacy",
    price: 550,
    stock: 90,
    imageUrls: [MOCK_IMG("multi")],
    description:
      "Daily multivitamin and mineral supplement. 30 tablets per pack.",
    createdAt: "2026-07-12T00:00:00.000Z",
  },
].map((p) => ({ ...p, createdBy: p.createdBy || "mock-user-merchant" }));

export const SAMPLE_CATEGORIES = [
  "Groceries",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Beverages",
  "Snacks",
  "Cosmetics",
  "Pharmacy",
  "Stationery",
  "Household Items",
  "Electronics",
];

export const SAMPLE_BRANDS = [
  "Local Farms Nepal",
  "Daily Fresh Dairy",
  "HealthPlus Nepal",
  "StudyMate Stationery",
  "Nepal Organic",
  "PureNepal",
  "ArtMate",
  "SafeCare",
  "Masala Nepal",
  "Daily Fresh",
  "Apple",
  "Samsung",
  "Dell",
  "Sony",
  "HP",
];

export function getMockProducts() {
  if (typeof window === "undefined") return SAMPLE_PRODUCTS;
  try {
    const stored = localStorage.getItem("snapmart_mock_products");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("snapmart_mock_products", JSON.stringify(SAMPLE_PRODUCTS));
  } catch {}
  return SAMPLE_PRODUCTS;
}

export function saveMockProducts(products) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("snapmart_mock_products", JSON.stringify(products));
  } catch {}
}

export function filterProducts(searchParams = {}) {
  let results = getMockProducts();

  if (searchParams.category) {
    results = results.filter(
      (p) =>
        p.category.toLowerCase() === searchParams.category.toLowerCase()
    );
  }
  if (searchParams.brands) {
    const brands = searchParams.brands.split(",");
    results = results.filter((p) => brands.includes(p.brand));
  }
  if (searchParams.min) {
    results = results.filter((p) => p.price >= Number(searchParams.min));
  }
  if (searchParams.max) {
    results = results.filter((p) => p.price <= Number(searchParams.max));
  }
  if (searchParams.name) {
    results = results.filter((p) =>
      p.name.toLowerCase().includes(searchParams.name.toLowerCase())
    );
  }
  if (searchParams.createdBy) {
    results = results.filter((p) => p.createdBy === searchParams.createdBy);
  }
  if (searchParams.sort) {
    try {
      const sort = JSON.parse(searchParams.sort);
      const [key, order] = Object.entries(sort)[0];
      results.sort((a, b) => {
        if (order === -1)
          return (b[key] || "") > (a[key] || "") ? 1 : -1;
        return (a[key] || "") > (b[key] || "") ? 1 : -1;
      });
    } catch {}
  }

  const limit = Number(searchParams.limit) || 100;
  return results.slice(0, limit);
}
