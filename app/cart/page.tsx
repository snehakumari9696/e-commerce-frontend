"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { Header } from "@/components/header"
import { CartSidebar } from "@/components/cart-sidebar"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems, clearCart } = useCart()

  const shipping = totalPrice > 100 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  // Get recommended products
  const recommendedProducts = products.filter(
    (p) => !items.find((item) => item.id === p.id)
  ).slice(0, 4)

  if (items.length === 0) {
    return (
      <>
        <Header />
        <CartSidebar />
        
        <main className="min-h-screen pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="font-serif text-3xl font-semibold mb-4">Your bag is empty</h1>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your bag yet. Start shopping to fill it up!
              </p>
              <Link href="/products">
                <Button size="lg">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <section className="mt-16">
                <h2 className="font-serif text-2xl font-semibold mb-8 text-center">
                  Popular Right Now
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  {recommendedProducts.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/products/${product.id}`}
                      className="group"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary mb-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-sm font-semibold">${product.price}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <CartSidebar />
      
      <main className="min-h-screen pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold">Shopping Bag</h1>
            <span className="text-muted-foreground">{totalItems} items</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Free Shipping Progress */}
              {totalPrice < 100 && (
                <div className="bg-secondary rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Add ${(100 - totalPrice).toFixed(2)} more for free shipping</span>
                    <Truck className="h-4 w-4" />
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${Math.min((totalPrice / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-card rounded-xl border">
                    <Link href={`/products/${item.id}`} className="flex-shrink-0">
                      <div className="relative w-24 h-32 sm:w-32 sm:h-40 rounded-lg overflow-hidden bg-secondary">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <Link 
                            href={`/products/${item.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 border rounded-lg px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-6 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart */}
              <div className="flex justify-between items-center">
                <Link href="/products" className="text-sm text-primary hover:underline">
                  Continue Shopping
                </Link>
                <Button variant="ghost" onClick={clearCart} className="text-sm text-muted-foreground">
                  Clear Bag
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border p-6 sticky top-32">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <Input placeholder="Promo code" className="flex-1" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button className="w-full h-12 text-base">
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                  <div className="flex flex-col items-center text-center gap-1">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <RotateCcw className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Easy Returns</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Secure Pay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
