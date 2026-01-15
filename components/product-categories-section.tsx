"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { getProductsByCategory, type ProductCategory } from "@/lib/product-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    id: "skincare" as ProductCategory,
    name: "Chăm sóc da",
    nameVi: "Chăm sóc da",
    count: "150+",
    image: "/skincare-category-woman.jpg",
    imageQuery: "elegant woman applying cream to face skincare routine minimal background",
  },
  {
    id: "makeup" as ProductCategory,
    name: "Trang điểm",
    nameVi: "Trang điểm",
    count: "200+",
    image: "/makeup-category-flatlay.jpg",
    imageQuery: "makeup products flatlay pink background lipstick mascara brushes elegant arrangement",
  },
  {
    id: "haircare" as ProductCategory,
    name: "Chăm sóc tóc",
    nameVi: "Chăm sóc tóc",
    count: "80+",
    image: "/haircare-category-products.jpg",
    imageQuery: "hair care products serum oil shampoo bottles with beautiful hair background",
  },
  {
    id: "fragrance" as ProductCategory,
    name: "Nước hoa",
    nameVi: "Nước hoa",
    count: "60+",
    image: "/perfume-category-bottles.jpg",
    imageQuery: "luxury perfume bottles elegant display warm lighting amber tones",
  },
]

export function ProductCategoriesSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null)

  const categoryProducts = selectedCategory ? getProductsByCategory(selectedCategory) : []
  const displayProducts = categoryProducts.slice(0, 8)

  return (
    <section className="px-4 bg-secondary/30 py-0">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-foreground text-balance">
            Danh mục sản phẩm
          </h2>
          <p className="text-muted-foreground text-lg">Khám phá bộ sưu tập đa dạng của chúng tôi</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group relative overflow-hidden rounded-2xl bg-card border-2 transition-all hover:shadow-lg ${
                selectedCategory === category.id ? "border-primary shadow-lg scale-[1.02]" : "border-transparent"
              }`}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.nameVi}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-left">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-1">{category.nameVi}</h3>
                <p className="text-white/90 text-sm md:text-base">{category.count} sản phẩm</p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Category Products */}
        {selectedCategory && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground font-serif">
                Sản phẩm {categories.find((c) => c.id === selectedCategory)?.nameVi}
              </h3>
              <Button variant="ghost" asChild>
                <Link href={`/catalog?category=${selectedCategory}`}>
                  Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border">
                <p className="text-muted-foreground">Không có sản phẩm nào trong danh mục này</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
