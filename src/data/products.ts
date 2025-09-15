export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Traditional Dosa Pan",
    description: "Handcrafted iron dosa pan perfect for making crispy dosas and uttapams. Seasoned and ready to use.",
    price: "₹899",
    image: "/images/product1.jpg",
    features: ["Pre-seasoned", "Even heat distribution", "Durable iron construction", "Traditional design"]
  },
  {
    id: 2,
    name: "Iron Kadai",
    description: "Heavy-duty iron kadai ideal for deep frying and curry preparation. Enhanced with traditional forging techniques.",
    price: "₹1,299",
    image: "/images/product2.jpg",
    features: ["Deep frying ready", "Rust resistant", "Heat retention", "Authentic taste"]
  },
  {
    id: 3,
    name: "Iron Tawa",
    description: "Flat iron tawa perfect for rotis, parathas, and other Indian breads. Provides even cooking surface.",
    price: "₹649",
    image: "/images/product3.jpg",
    features: ["Non-stick surface", "Even heating", "Easy maintenance", "Traditional craft"]
  },
  {
    id: 4,
    name: "Iron Wok",
    description: "Versatile iron wok suitable for stir-frying, steaming, and various cooking methods. Professional grade quality.",
    price: "₹1,099",
    image: "/images/product4.jpg",
    features: ["Multi-purpose", "High heat cooking", "Professional grade", "Ergonomic handles"]
  },
  {
    id: 5,
    name: "Iron Skillet Set",
    description: "Complete set of iron skillets in different sizes. Perfect for families and professional kitchens.",
    price: "₹2,299",
    image: "/images/product5.jpg",
    features: ["Multiple sizes", "Set of 3", "Stackable design", "Premium finish"]
  },
  {
    id: 6,
    name: "Cast Iron Grill Pan",
    description: "Ridged cast iron grill pan for authentic grill marks and superb searing on stovetop or oven.",
    price: "₹1,499",
    image: "/images/product6.jpg",
    features: ["Ridged base", "High heat searing", "Oven safe", "Easy seasoning"]
  }
];