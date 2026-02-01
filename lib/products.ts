export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: "Makeup" | "Clothes"
  subcategory: string
  description: string
  details: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
}

export interface Review {
  id: string
  productId: string
  author: string
  avatar: string
  rating: number
  date: string
  title: string
  content: string
  helpful: number
}

export const products: Product[] = [
  // MAKEUP PRODUCTS
  {
    id: "1",
    name: "Velvet Matte Lipstick",
    price: 32,
    originalPrice: 42,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
    ],
    category: "Makeup",
    subcategory: "Lips",
    description: "Long-lasting velvet matte finish lipstick with intense color payoff. Enriched with vitamin E for hydrated lips all day.",
    details: ["Cruelty-free", "24-hour wear", "Vitamin E enriched", "Highly pigmented"],
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Luminous Foundation",
    price: 48,
    image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d4e?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631214500115-598fc2cb8d4e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
    ],
    category: "Makeup",
    subcategory: "Face",
    description: "Buildable coverage foundation with a natural, luminous finish. SPF 25 protection with skin-loving ingredients.",
    details: ["SPF 25", "Buildable coverage", "Natural finish", "40 shades available"],
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Smoky Eye Palette",
    price: 58,
    originalPrice: 72,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&h=600&fit=crop",
    ],
    category: "Makeup",
    subcategory: "Eyes",
    description: "12 versatile shades from neutral to dramatic smoky tones. Buttery smooth formula with excellent blendability.",
    details: ["12 shades", "Matte & shimmer", "Mirror included", "Highly blendable"],
    rating: 4.9,
    reviewCount: 342,
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Hydrating Lip Gloss",
    price: 24,
    image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
    ],
    category: "Makeup",
    subcategory: "Lips",
    description: "High-shine lip gloss with nourishing oils. Non-sticky formula that keeps lips soft and supple.",
    details: ["Non-sticky", "Vitamin E", "High shine", "Plumping effect"],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
  },
  {
    id: "5",
    name: "Setting Spray",
    price: 28,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
    ],
    category: "Makeup",
    subcategory: "Face",
    description: "Lock your makeup in place for up to 16 hours. Refreshing mist with a natural, dewy finish.",
    details: ["16-hour hold", "Dewy finish", "Alcohol-free", "Refreshing mist"],
    rating: 4.7,
    reviewCount: 215,
    inStock: true,
  },
  {
    id: "6",
    name: "Volumizing Mascara",
    price: 26,
    image: "https://images.unsplash.com/photo-1631214540242-e1a98e17ba5b?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631214540242-e1a98e17ba5b?w=600&h=600&fit=crop",
    ],
    category: "Makeup",
    subcategory: "Eyes",
    description: "Dramatic volume and length without clumping. Smudge-proof formula that lasts all day.",
    details: ["Volumizing", "Smudge-proof", "Easy removal", "Ophthalmologist tested"],
    rating: 4.6,
    reviewCount: 198,
    inStock: true,
    isNew: true,
  },

  // CLOTHES PRODUCTS
  {
    id: "7",
    name: "Silk Midi Dress",
    price: 189,
    originalPrice: 240,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop",
    ],
    category: "Clothes",
    subcategory: "Dresses",
    description: "Elegant silk midi dress with a flattering A-line silhouette. Perfect for both day and evening occasions.",
    details: ["100% Mulberry silk", "A-line silhouette", "Side zip closure", "Dry clean only"],
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "8",
    name: "Cashmere Sweater",
    price: 165,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop",
    ],
    category: "Clothes",
    subcategory: "Tops",
    description: "Ultra-soft cashmere sweater in a relaxed fit. Timeless design for endless styling options.",
    details: ["100% Cashmere", "Relaxed fit", "Ribbed trim", "Hand wash"],
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
  },
  {
    id: "9",
    name: "High-Waist Trousers",
    price: 98,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop",
    ],
    category: "Clothes",
    subcategory: "Bottoms",
    description: "Tailored high-waist trousers with a wide leg. Flattering fit that elongates the silhouette.",
    details: ["Wool blend", "High waist", "Wide leg", "Front pleats"],
    rating: 4.6,
    reviewCount: 87,
    inStock: true,
    isNew: true,
  },
  {
    id: "10",
    name: "Leather Jacket",
    price: 295,
    originalPrice: 380,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&h=600&fit=crop",
    ],
    category: "Clothes",
    subcategory: "Outerwear",
    description: "Classic leather biker jacket with silver hardware. Timeless piece that only gets better with age.",
    details: ["Genuine leather", "Silver hardware", "Asymmetric zip", "Lined interior"],
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "11",
    name: "Linen Blouse",
    price: 78,
    image: "https://images.unsplash.com/photo-1604575396270-0c7e3f6cdde8?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1604575396270-0c7e3f6cdde8?w=600&h=600&fit=crop",
    ],
    category: "Clothes",
    subcategory: "Tops",
    description: "Breathable linen blouse with delicate button details. Effortlessly elegant for warm days.",
    details: ["100% Linen", "Pearl buttons", "Relaxed fit", "Machine washable"],
    rating: 4.5,
    reviewCount: 94,
    inStock: true,
  },
  {
    id: "12",
    name: "Denim Jeans",
    price: 128,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=600&fit=crop",
    ],
    category: "Clothes",
    subcategory: "Bottoms",
    description: "Premium straight-leg jeans with the perfect vintage wash. Comfortable stretch denim.",
    details: ["98% Cotton, 2% Elastane", "Straight leg", "5-pocket design", "Medium wash"],
    rating: 4.7,
    reviewCount: 267,
    inStock: true,
  },
  {
    id: "13",
    name: "Contour Blush Duo",
    price: 42,
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&h=600&fit=crop",
    ],
    category: "Makeup",
    subcategory: "Face",
    description: "Sculpt and highlight with this versatile duo. Silky powder formula for a natural-looking glow.",
    details: ["2-in-1 palette", "Silky powder", "Buildable color", "Mirror included"],
    rating: 4.4,
    reviewCount: 142,
    inStock: true,
  },
  {
    id: "14",
    name: "Satin Camisole",
    price: 58,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=600&fit=crop",
    ],
    category: "Clothes",
    subcategory: "Tops",
    description: "Luxurious satin camisole with delicate lace trim. Perfect for layering or on its own.",
    details: ["Satin fabric", "Lace trim", "Adjustable straps", "Hand wash"],
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
    isNew: true,
  },
  {
    id: "15",
    name: "Brow Perfecting Gel",
    price: 22,
    image: "https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=600&h=600&fit=crop",
    ],
    category: "Makeup",
    subcategory: "Eyes",
    description: "Tinted brow gel for natural-looking, perfectly groomed brows. Long-lasting hold without stiffness.",
    details: ["Natural finish", "Flexible hold", "Tinted formula", "Spoolie applicator"],
    rating: 4.3,
    reviewCount: 165,
    inStock: true,
  },
  {
    id: "16",
    name: "Pleated Midi Skirt",
    price: 115,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=600&h=600&fit=crop",
    ],
    category: "Clothes",
    subcategory: "Bottoms",
    description: "Elegant pleated midi skirt with a fluid drape. Versatile piece for work to weekend.",
    details: ["Polyester blend", "Elastic waist", "Midi length", "Pleated design"],
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
  },
]

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    author: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    date: "2024-01-15",
    title: "Best lipstick ever!",
    content: "The color payoff is incredible and it stays on all day without drying out my lips. I've repurchased this three times already!",
    helpful: 24,
  },
  {
    id: "r2",
    productId: "1",
    author: "Emily R.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    date: "2024-01-10",
    title: "Long-lasting and beautiful",
    content: "I wore this to a wedding and it lasted through dinner and dancing. The velvet finish is so elegant.",
    helpful: 18,
  },
  {
    id: "r3",
    productId: "7",
    author: "Jessica L.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 5,
    date: "2024-01-12",
    title: "Gorgeous dress!",
    content: "The silk quality is amazing and the fit is perfect. I got so many compliments. Worth every penny!",
    helpful: 32,
  },
  {
    id: "r4",
    productId: "3",
    author: "Michelle K.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4,
    date: "2024-01-08",
    title: "Great palette",
    content: "Beautiful shades that blend well. One shade had less pigment than others but overall very happy with it.",
    helpful: 15,
  },
]

export const categories = ["All", "Makeup", "Clothes"] as const
export const makeupSubcategories = ["All", "Lips", "Eyes", "Face"] as const
export const clothesSubcategories = ["All", "Dresses", "Tops", "Bottoms", "Outerwear"] as const

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId)
}

export function getRelatedProducts(product: Product): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
}
