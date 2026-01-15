"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Link from "next/link"
import { ComparisonButton } from "@/components/comparison-button"
import type { Product } from "@/lib/product-data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group h-full overflow-hidden rounded-2xl border-border transition-all hover:shadow-lg bg-card">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-6 space-y-3">
        <Link href={`/product/${product.id}`}>
          <p className="text-sm text-muted-foreground mb-2">
            {product.category === "skincare"
              ? "Chăm sóc da"
              : product.category === "makeup"
                ? "Trang điểm"
                : product.category === "haircare"
                  ? "Chăm sóc tóc"
                  : "Nước hoa"}
          </p>
          <h3 className="font-serif text-xl font-semibold leading-tight mb-3">{product.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="ml-1 text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewCount} đánh giá)</span>
          </div>
          <p className="font-serif text-2xl font-bold text-primary mb-4">{product.price.toLocaleString("vi-VN")}₫</p>
        </Link>
        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/product/${product.id}`}>Xem chi tiết</Link>
          </Button>
          <ComparisonButton
            product={{
              id: Number(product.id),
              name: product.name,
              category:
                product.category === "skincare"
                  ? "Chăm sóc da"
                  : product.category === "makeup"
                    ? "Trang điểm"
                    : product.category === "haircare"
                      ? "Chăm sóc tóc"
                      : "Nước hoa",
              price: `${product.price.toLocaleString("vi-VN")}₫`,
              rating: product.rating,
              reviews: product.reviewCount,
              image: product.image,
            }}
            showText={false}
            size="sm"
          />
        </div>
      </CardContent>
    </Card>
  )
}
