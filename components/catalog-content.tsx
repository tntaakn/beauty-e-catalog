"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductFilter, type FilterState } from "@/components/product-filter"
import { ProductGrid } from "@/components/product-grid"

export function CatalogContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: searchQuery,
    categories: [],
    skinTypes: [],
    concerns: [],
    brands: [],
    priceRange: [0, 500],
    includeIngredients: [],
    excludeIngredients: [],
  })

  useEffect(() => {
    setFilters((prev) => ({ ...prev, searchQuery }))
  }, [searchQuery])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-serif text-4xl font-bold">Tất cả sản phẩm</h1>
        <p className="text-lg text-muted-foreground">
          {searchQuery ? `Kết quả tìm kiếm cho "${searchQuery}"` : "Khám phá bộ sưu tập sản phẩm làm đẹp của chúng tôi"}
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full lg:w-64 lg:flex-shrink-0">
          <ProductFilter filters={filters} onFilterChange={setFilters} />
        </aside>

        <div className="flex-1">
          <ProductGrid filters={filters} />
        </div>
      </div>
    </div>
  )
}
