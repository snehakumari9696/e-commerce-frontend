import { CartProvider } from "@/lib/cart-context"
import { Header } from "@/components/header"
import { CartSidebar } from "@/components/cart-sidebar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ProductGrid } from "@/components/product-grid"
import { CategoriesSection } from "@/components/categories-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <CartSidebar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <ProductGrid />
          <CategoriesSection />
          <NewsletterSection />
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
