"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, SlidersHorizontal, X, Star, Heart, ShoppingBag, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products, categories, makeupSubcategories, clothesSubcategories } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { CartSidebar } from "@/components/cart-sidebar"
import { Footer } from "@/components/footer"

const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "All"
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [filtersOpen, setFiltersOpen] = useState(false)
  
  const { addItem } = useCart()

  const subcategories = selectedCategory === "Makeup" 
    ? makeupSubcategories 
    : selectedCategory === "Clothes" 
    ? clothesSubcategories 
    : []

  const filteredProducts = useMemo(() => {
    let result = products

    // Filter by search
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Filter by subcategory
    if (selectedSubcategories.length > 0) {
      result = result.filter(p => selectedSubcategories.includes(p.subcategory))
    }

    // Filter by price
    if (selectedPriceRanges.length > 0) {
      result = result.filter(p => 
        selectedPriceRanges.some(i => {
          const range = priceRanges[i]
          return p.price >= range.min && p.price < range.max
        })
      )
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    return result
  }, [searchQuery, selectedCategory, selectedSubcategories, selectedPriceRanges, sortBy])

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    )
  }

  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedSubcategories([])
    setSelectedPriceRanges([])
    setSearchQuery("")
  }

  const activeFiltersCount = (selectedCategory !== "All" ? 1 : 0) + 
    selectedSubcategories.length + 
    selectedPriceRanges.length

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat)
                setSelectedSubcategories([])
              }}
              className={cn(
                "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                selectedCategory === cat 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Type</h3>
          <div className="space-y-2">
            {subcategories.slice(1).map((sub) => (
              <div key={sub} className="flex items-center space-x-2">
                <Checkbox
                  id={sub}
                  checked={selectedSubcategories.includes(sub)}
                  onCheckedChange={() => toggleSubcategory(sub)}
                />
                <Label htmlFor={sub} className="text-sm cursor-pointer">{sub}</Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price</h3>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <div key={range.label} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${index}`}
                checked={selectedPriceRanges.includes(index)}
                onCheckedChange={() => togglePriceRange(index)}
              />
              <Label htmlFor={`price-${index}`} className="text-sm cursor-pointer">{range.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <>
      <Header />
      <CartSidebar />
      
      <main className="min-h-screen pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">
              {selectedCategory === "All" ? "Shop All" : selectedCategory}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {selectedCategory === "Makeup" 
                ? "Discover our curated collection of premium cosmetics for every look"
                : selectedCategory === "Clothes"
                ? "Elevate your wardrobe with timeless pieces and modern essentials"
                : "Explore our complete collection of makeup and fashion"}
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden relative bg-transparent">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory !== "All" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedSubcategories.map(sub => (
                <Badge key={sub} variant="secondary" className="gap-1">
                  {sub}
                  <button onClick={() => toggleSubcategory(sub)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedPriceRanges.map(i => (
                <Badge key={i} variant="secondary" className="gap-1">
                  {priceRanges[i].label}
                  <button onClick={() => togglePriceRange(i)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg mb-4">No products found</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="group">
                      <Link href={`/products/${product.id}`}>
                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary mb-3">
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

                          {/* Quick Actions */}
                          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Add to Cart */}
                          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              className="w-full"
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
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span className="text-xs text-muted-foreground">
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-medium text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
