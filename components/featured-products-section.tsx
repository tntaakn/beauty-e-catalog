"use client"

import type { Product } from "@/lib/product-data"
import { ProductCard } from "./product-card"
import { Button } from "./ui/button"
import Link from "next/link"
import { TrendingUp, ArrowRight } from "lucide-react"

interface FeaturedProductsSectionProps {
  products: Product[]
}

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  // Show only first 4 products
  const displayProducts = products.slice(0, 4)

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-serif text-balance text-foreground">Xu hướng tuần này</h2>
              <p className="text-muted-foreground py-0.5">Sản phẩm được quan tâm nhiều nhất</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/catalog">
              Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Product Grid - 4 products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
