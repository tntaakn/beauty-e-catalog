"use client"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { sampleProducts } from "@/lib/product-data"


interface RelatedProductsProps {
  currentProductId: string
  category?: string
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const relatedProducts = sampleProducts
    .filter((product) => {
      // Exclude current product
      if (product.id === currentProductId) return false
      // Filter by same category if provided
      if (category && product.category !== category) return false
      return true
    })
    .slice(0, 4)

  return (
    <section className="border-t border-border bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-balance font-serif text-3xl font-bold">Sản phẩm liên quan</h2>
              <p className="py-0.5 text-muted-foreground">Các sản phẩm bạn có thể quan tâm</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/catalog">
              Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
