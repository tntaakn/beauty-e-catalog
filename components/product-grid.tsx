"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sampleProducts } from "@/lib/product-data"
import type { FilterState } from "@/components/product-filter"

interface ProductGridProps {
  filters?: FilterState
  initialLimit?: number
}

export function ProductGrid({ filters, initialLimit = 9 }: ProductGridProps) {
  const [showAll, setShowAll] = useState(false)
  const [sortBy, setSortBy] = useState("popular")

  // Filter products based on filters
  const filteredProducts = useMemo(() => {
    let products = [...sampleProducts]

    if (!filters) return products

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (filters.categories.length > 0) {
      products = products.filter((p) => filters.categories.includes(p.category))
    }

    // Skin type filter
    if (filters.skinTypes.length > 0) {
      products = products.filter((p) => filters.skinTypes.some((type) => p.suitableFor.includes(type)))
    }

    // Concerns filter
    if (filters.concerns.length > 0) {
      products = products.filter((p) => filters.concerns.some((concern) => p.concerns.includes(concern)))
    }

    // Brand filter
    if (filters.brands.length > 0) {
      products = products.filter((p) => filters.brands.includes(p.brand))
    }

    // Price range filter
    const [minPrice, maxPrice] = filters.priceRange
    products = products.filter((p) => p.price >= minPrice * 1000 && p.price <= maxPrice * 1000)

    // Include ingredients filter
    if (filters.includeIngredients.length > 0) {
      products = products.filter((p) =>
        filters.includeIngredients.every((ing) =>
          p.ingredients.some((i) => i.nameVi.toLowerCase().includes(ing.toLowerCase())),
        ),
      )
    }

    // Exclude ingredients filter
    if (filters.excludeIngredients.length > 0) {
      products = products.filter(
        (p) =>
          !filters.excludeIngredients.some((ing) =>
            p.ingredients.some((i) => i.nameVi.toLowerCase().includes(ing.toLowerCase())),
          ),
      )
    }

    return products
  }, [filters])

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts]

    switch (sortBy) {
      case "price-asc":
        return products.sort((a, b) => a.price - b.price)
      case "price-desc":
        return products.sort((a, b) => b.price - a.price)
      case "rating":
        return products.sort((a, b) => b.rating - a.rating)
      case "newest":
        return products.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
      case "popular":
      default:
        return products.sort((a, b) => b.reviewCount - a.reviewCount)
    }
  }, [filteredProducts, sortBy])

  // Limit displayed products
  const displayedProducts = showAll ? sortedProducts : sortedProducts.slice(0, initialLimit)

  const hasMore = sortedProducts.length > initialLimit

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 rounded-lg p-4 sm:flex-row sm:items-center sm:justify-between border-0 py-0">
        <p className="text-sm text-muted-foreground">
          Hiển thị {displayedProducts.length} / {sortedProducts.length} sản phẩm
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sắp xếp:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Phổ biến nhất</SelectItem>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="rating">Đánh giá cao</SelectItem>
              <SelectItem value="price-asc">Giá tăng dần</SelectItem>
              <SelectItem value="price-desc">Giá giảm dần</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">Không tìm thấy sản phẩm phù hợp với bộ lọc của bạn</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && !showAll && (
            <div className="flex justify-center pt-8">
              <Button onClick={() => setShowAll(true)} variant="outline" size="lg" className="min-w-[200px]">
                Xem thêm ({sortedProducts.length - initialLimit} sản phẩm)
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
