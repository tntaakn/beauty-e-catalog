"use client"

import { useComparisonStore } from "@/lib/comparison-store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Star, Heart, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ComparisonTable() {
  const { products, removeProduct, clearAll } = useComparisonStore()

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">So sánh sản phẩm</h1>
          <p className="mb-8 text-muted-foreground">
            Bạn chưa chọn sản phẩm nào để so sánh. Hãy thêm sản phẩm từ trang catalog.
          </p>
          <Button asChild>
            <Link href="/catalog">Xem sản phẩm</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">So sánh sản phẩm</h1>
          <p className="text-muted-foreground mb-4">Đang so sánh {products.length} sản phẩm</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={clearAll}>
              Xóa tất cả
            </Button>
            <Button variant="outline" asChild>
              <Link href="/catalog">
                <Plus className="mr-2 h-4 w-4" />
                Thêm sản phẩm
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden bg-card">
              <div className="relative aspect-square bg-muted">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                  onClick={() => removeProduct(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-6 space-y-4">
                {/* Category and Name */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 pb-4 border-b">
                  <span className="text-xs font-medium text-muted-foreground">Giá</span>
                  <span className="text-xl font-bold">{product.price.toLocaleString("vi-VN")} VNĐ</span>
                </div>

                {/* Volume */}
                <div className="flex items-baseline gap-2 pb-4 border-b">
                  <span className="text-xs font-medium text-muted-foreground">Dung tích</span>
                  <span className="text-sm">{product.volume || "N/A"}</span>
                </div>

                {/* Rating */}
                <div className="flex items-baseline gap-2 pb-4 border-b">
                  <span className="text-xs font-medium text-muted-foreground">Đánh giá</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviewCount} đánh giá)</span>
                  </div>
                </div>

                {/* Skin Types */}
                <div className="pb-4 border-b">
                  <span className="text-xs font-medium text-muted-foreground mb-2 block">Phù hợp với</span>
                  <div className="flex flex-wrap gap-2">
                    {product.suitableFor?.map((type) => (
                      <Badge key={type} variant="secondary" className="rounded-full">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Ingredients */}
                <div className="pb-4 border-b">
                  <span className="text-xs font-medium text-muted-foreground mb-2 block">Thành phần</span>
                  <div className="space-y-2">
                    {product.ingredients?.slice(0, 3).map((ingredient, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="flex items-center gap-1 flex-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="text-sm font-medium">{ingredient.nameVi}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{ingredient.benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Heart className="mr-2 h-4 w-4" />
                    Thêm vào yêu thích
                  </Button>
                  <Button variant="link" className="w-full" asChild>
                    <Link href={`/product/${product.id}`}>Xem chi tiết</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {products.length < 3 &&
            Array.from({ length: 3 - products.length }).map((_, idx) => (
              <Card key={`empty-${idx}`} className="overflow-hidden bg-card">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <Plus className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Chọn sản phẩm</p>
                  </div>
                </div>
                <div className="p-6">
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/catalog">
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm sản phẩm
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
