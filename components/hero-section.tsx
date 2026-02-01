"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <span className="text-xs tracking-[0.3em] uppercase text-primary mb-6 block font-medium">
              Spring/Summer 2026
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6 text-balance">
              Beauty Meets
              <br />
              <span className="text-primary">Fashion</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Discover our curated collection of premium cosmetics and timeless fashion pieces designed to elevate your everyday style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products?category=Makeup">
                <Button
                  size="lg"
                  className="h-14 px-8 text-sm tracking-wide uppercase gap-2 group w-full sm:w-auto"
                >
                  Shop Makeup
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/products?category=Clothes">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-sm tracking-wide uppercase bg-transparent w-full sm:w-auto"
                >
                  Shop Clothes
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t">
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">50k+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">200+</p>
                <p className="text-sm text-muted-foreground">Premium Products</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-primary">4.9</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
              <Image
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop"
                alt="Beauty and Fashion Collection"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-primary/30 rounded-full hidden lg:block" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full hidden lg:block" />
            
            {/* Floating badge */}
            <div className="absolute bottom-8 -left-4 bg-card shadow-lg rounded-xl p-4 hidden lg:block">
              <p className="text-xs text-muted-foreground mb-1">Best Seller</p>
              <p className="font-medium">Velvet Matte Lipstick</p>
              <p className="text-primary font-semibold">$32</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
