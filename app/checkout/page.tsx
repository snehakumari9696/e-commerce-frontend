"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, CreditCard, Truck, Check, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { CartSidebar } from "@/components/cart-sidebar"

const steps = ["Information", "Shipping", "Payment"]

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(0)
  const [orderComplete, setOrderComplete] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zip: "",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
    saveInfo: false,
  })

  const shipping = formData.shippingMethod === "express" ? 19.99 : totalPrice > 100 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  const updateForm = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      setOrderComplete(true)
      clearCart()
    }
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <>
        <Header />
        <CartSidebar />
        <main className="min-h-screen pt-28 pb-16">
          <div className="max-w-lg mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl font-semibold mb-4">Your bag is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to checkout</p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
      </>
    )
  }

  if (orderComplete) {
    return (
      <>
        <Header />
        <CartSidebar />
        <main className="min-h-screen pt-28 pb-16">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-semibold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your purchase. Your order #GLM-{Math.random().toString(36).substring(2, 8).toUpperCase()} has been confirmed.
            </p>
            <p className="text-muted-foreground mb-8">
              A confirmation email has been sent to {formData.email || "your email"}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button>Continue Shopping</Button>
              </Link>
              <Button variant="outline">Track Order</Button>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <CartSidebar />
      
      <main className="min-h-screen pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link 
            href="/cart" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to bag
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Form Section */}
            <div>
              <h1 className="font-serif text-3xl font-semibold mb-8">Checkout</h1>

              {/* Steps */}
              <div className="flex items-center gap-4 mb-8">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center">
                    <button
                      onClick={() => index < currentStep && setCurrentStep(index)}
                      className={cn(
                        "flex items-center gap-2 text-sm font-medium",
                        index === currentStep ? "text-foreground" : 
                        index < currentStep ? "text-primary" : "text-muted-foreground"
                      )}
                      disabled={index > currentStep}
                    >
                      <span className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                        index === currentStep ? "bg-primary text-primary-foreground" : 
                        index < currentStep ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                        {index < currentStep ? <Check className="h-3 w-3" /> : index + 1}
                      </span>
                      {step}
                    </button>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "w-12 h-px mx-3",
                        index < currentStep ? "bg-primary" : "bg-border"
                      )} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Information */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-semibold mb-4">Contact Information</h2>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => updateForm("email", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone (optional)</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => updateForm("phone", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h2 className="font-semibold mb-4">Shipping Address</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={(e) => updateForm("firstName", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={(e) => updateForm("lastName", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            placeholder="123 Main St"
                            value={formData.address}
                            onChange={(e) => updateForm("address", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                          <Input
                            id="apartment"
                            placeholder="Apt 4B"
                            value={formData.apartment}
                            onChange={(e) => updateForm("apartment", e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              placeholder="New York"
                              value={formData.city}
                              onChange={(e) => updateForm("city", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              placeholder="NY"
                              value={formData.state}
                              onChange={(e) => updateForm("state", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input
                              id="zip"
                              placeholder="10001"
                              value={formData.zip}
                              onChange={(e) => updateForm("zip", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveInfo"
                        checked={formData.saveInfo}
                        onCheckedChange={(checked) => updateForm("saveInfo", checked as boolean)}
                      />
                      <Label htmlFor="saveInfo" className="text-sm cursor-pointer">
                        Save this information for next time
                      </Label>
                    </div>
                  </div>
                )}

                {/* Step 2: Shipping */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-semibold mb-4">Shipping Method</h2>
                      <RadioGroup
                        value={formData.shippingMethod}
                        onValueChange={(value) => updateForm("shippingMethod", value)}
                        className="space-y-3"
                      >
                        <label className={cn(
                          "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors",
                          formData.shippingMethod === "standard" && "border-primary bg-primary/5"
                        )}>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="standard" id="standard" />
                            <div>
                              <span className="font-medium">Standard Shipping</span>
                              <p className="text-sm text-muted-foreground">5-7 business days</p>
                            </div>
                          </div>
                          <span className="font-medium">
                            {totalPrice > 100 ? "Free" : "$9.99"}
                          </span>
                        </label>
                        <label className={cn(
                          "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors",
                          formData.shippingMethod === "express" && "border-primary bg-primary/5"
                        )}>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="express" id="express" />
                            <div>
                              <span className="font-medium">Express Shipping</span>
                              <p className="text-sm text-muted-foreground">2-3 business days</p>
                            </div>
                          </div>
                          <span className="font-medium">$19.99</span>
                        </label>
                      </RadioGroup>
                    </div>

                    <div className="bg-secondary rounded-lg p-4">
                      <h3 className="font-medium mb-2">Shipping to:</h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}{formData.apartment && `, ${formData.apartment}`}<br />
                        {formData.city}, {formData.state} {formData.zip}
                      </p>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(0)}
                        className="text-sm text-primary hover:underline mt-2"
                      >
                        Edit address
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-semibold mb-4">Payment Method</h2>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => updateForm("paymentMethod", value)}
                        className="space-y-3"
                      >
                        <label className={cn(
                          "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors",
                          formData.paymentMethod === "card" && "border-primary bg-primary/5"
                        )}>
                          <RadioGroupItem value="card" id="card" />
                          <CreditCard className="h-5 w-5" />
                          <span className="font-medium">Credit Card</span>
                        </label>
                        <label className={cn(
                          "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors",
                          formData.paymentMethod === "paypal" && "border-primary bg-primary/5"
                        )}>
                          <RadioGroupItem value="paypal" id="paypal" />
                          <span className="font-bold text-blue-600">Pay</span>
                          <span className="font-bold text-blue-800">Pal</span>
                        </label>
                      </RadioGroup>
                    </div>

                    {formData.paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => updateForm("cardNumber", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={(e) => updateForm("cardName", e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry">Expiry Date</Label>
                            <Input
                              id="cardExpiry"
                              placeholder="MM/YY"
                              value={formData.cardExpiry}
                              onChange={(e) => updateForm("cardExpiry", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvc">CVC</Label>
                            <Input
                              id="cardCvc"
                              placeholder="123"
                              value={formData.cardCvc}
                              onChange={(e) => updateForm("cardCvc", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      Your payment information is secure and encrypted
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-4 mt-8">
                  {currentStep > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}
                  <Button type="submit" className="flex-1">
                    {currentStep === 2 ? `Pay $${grandTotal.toFixed(2)}` : "Continue"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:pl-8 lg:border-l">
              <div className="sticky top-32">
                <h2 className="font-semibold text-lg mb-6">Order Summary</h2>
                
                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                      <span className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Promo Code */}
                <div className="flex gap-2 mb-4">
                  <Input placeholder="Promo code" className="flex-1" />
                  <Button variant="outline">Apply</Button>
                </div>

                <Separator className="my-4" />

                {/* Totals */}
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

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
