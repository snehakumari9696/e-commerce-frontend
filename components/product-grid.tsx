"use client"

import { useState } from "react"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { products, categories } from "@/lib/products"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All")

  const filteredProducts =
    activeCategory === "All"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeCategory).slice(0, 8)

  return (
    <section id="shop" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block font-medium">
            Curated Selection
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold mb-6">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover our bestselling makeup and fashion pieces, loved by thousands of customers worldwide.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className={cn(
                "text-xs tracking-wide uppercase transition-all",
                activeCategory === category && "shadow-md",
                activeCategory !== category && "bg-transparent"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              featured={index === 0 && activeCategory === "All"}
            />
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-sm tracking-wide uppercase bg-transparent gap-2 group"
            >
              View All Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
