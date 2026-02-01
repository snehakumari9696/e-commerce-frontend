"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 sm:p-12 lg:p-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] uppercase opacity-70 mb-4 block">
              Stay Connected
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium mb-6">
              Join Our Community
            </h2>
            <p className="opacity-80 mb-8 leading-relaxed">
              Be the first to discover new arrivals, exclusive offers, and stories from our artisan partners.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-lg">
                <Check className="h-5 w-5" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                  required
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="h-12 px-6 text-sm tracking-wide uppercase gap-2 group shrink-0"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            )}

            <p className="text-xs opacity-50 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
