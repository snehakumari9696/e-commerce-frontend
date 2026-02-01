"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className={cn("group", featured && "lg:col-span-2 lg:row-span-2")}>
      <Link href={`/products/${product.id}`}>
        <div
          className={cn(
            "relative bg-secondary rounded-xl overflow-hidden mb-3 transition-all duration-300",
            featured ? "aspect-square lg:aspect-[4/3]" : "aspect-[3/4]"
          )}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground">New</Badge>
            )}
            {product.isBestSeller && (
              <Badge variant="secondary">Best Seller</Badge>
            )}
            {product.originalPrice && (
              <Badge className="bg-destructive text-destructive-foreground">Sale</Badge>
            )}
          </div>

          {/* Wishlist button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault()
              // Wishlist functionality
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Hover overlay with add to cart */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              className="w-full shadow-lg"
              onClick={(e) => {
                e.preventDefault()
                addItem(product)
              }}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Bag
            </Button>
          </div>
        </div>
      </Link>
      
      <div className="space-y-1">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2">
          <p className="font-semibold">${product.price}</p>
          {product.originalPrice && (
            <p className="text-sm text-muted-foreground line-through">${product.originalPrice}</p>
          )}
        </div>
      </div>
    </div>
  )
}
