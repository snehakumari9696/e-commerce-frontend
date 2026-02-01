"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const categoryData = [
  {
    name: "Makeup",
    description: "Premium cosmetics for flawless looks",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop",
    href: "/products?category=Makeup",
    items: "120+ Products",
  },
  {
    name: "Clothes",
    description: "Timeless fashion for every occasion",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop",
    href: "/products?category=Clothes",
    items: "80+ Products",
  },
]

const subcategoryData = [
  {
    name: "Lipsticks",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    href: "/products?category=Makeup",
  },
  {
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    href: "/products?category=Clothes",
  },
  {
    name: "Eye Makeup",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
    href: "/products?category=Makeup",
  },
  {
    name: "Outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    href: "/products?category=Clothes",
  },
]

export function CategoriesSection() {
  return (
    <section id="collections" className="py-20 lg:py-32 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block font-medium">
            Shop By Category
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold">
            Our Collections
          </h2>
        </div>

        {/* Main categories */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {categoryData.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="text-xs text-card/70 uppercase tracking-wider">{category.items}</span>
                <h3 className="font-serif text-3xl lg:text-4xl text-card mb-2">
                  {category.name}
                </h3>
                <p className="text-card/80 text-sm mb-4 leading-relaxed max-w-xs">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-card text-sm tracking-wide uppercase group-hover:gap-3 transition-all">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Subcategories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {subcategoryData.map((subcategory) => (
            <Link
              key={subcategory.name}
              href={subcategory.href}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src={subcategory.image || "/placeholder.svg"}
                alt={subcategory.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-serif text-xl text-card text-center">
                  {subcategory.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
