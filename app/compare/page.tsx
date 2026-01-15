"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { X, Star, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useComparisonStore } from "@/lib/comparison-store"

const skinTypeLabels: Record<string, string> = {
  normal: "Da thường",
  oily: "Da dầu",
  dry: "Da khô",
  combination: "Da hỗn hợp",
  sensitive: "Da nhạy cảm",
}

const concernLabels: Record<string, string> = {
  acne: "Mụn",
  darkspots: "Thâm nám",
  aging: "Lão hóa",
  dryness: "Khô da",
  sensitivity: "Nhạy cảm",
  oiliness: "Dầu nhờn",
}

function getFallbackData(productIndex: number) {
  const fallbackSets = [
    {
      volume: "30ml",
      rating: 4.7,
      reviewCount: 234,
      suitableFor: ["normal", "combination", "dry"],
      concerns: ["darkspots", "aging", "dryness"],
      ingredients: [
        { name: "Vitamin C", nameVi: "Vitamin C", benefit: "Làm sáng da, chống oxy hóa" },
        { name: "Hyaluronic Acid", nameVi: "Axit Hyaluronic", benefit: "Cấp ẩm sâu, làm căng mịn da" },
        { name: "Ferulic Acid", nameVi: "Axit Ferulic", benefit: "Tăng cường hiệu quả Vitamin C" },
      ],
    },
    {
      volume: "50ml",
      rating: 4.8,
      reviewCount: 189,
      suitableFor: ["dry", "sensitive", "normal"],
      concerns: ["dryness", "sensitivity"],
      ingredients: [
        { name: "Ceramide Complex", nameVi: "Phức hợp Ceramide", benefit: "Phục hồi hàng rào bảo vệ da" },
        { name: "Niacinamide", nameVi: "Niacinamide", benefit: "Sáng da, se khít lỗ chân lông" },
        { name: "Centella Asiatica", nameVi: "Rau má", benefit: "Làm dịu, kháng viêm" },
      ],
    },
    {
      volume: "30ml",
      rating: 4.6,
      reviewCount: 156,
      suitableFor: ["normal", "combination", "dry"],
      concerns: ["aging", "acne"],
      ingredients: [
        { name: "Retinol", nameVi: "Retinol", benefit: "Chống lão hóa, tái tạo da" },
        { name: "Squalane", nameVi: "Squalane", benefit: "Dưỡng ẩm, làm mềm da" },
        { name: "Vitamin E", nameVi: "Vitamin E", benefit: "Chống oxy hóa, bảo vệ da" },
      ],
    },
  ]

  return fallbackSets[productIndex % fallbackSets.length]
}

export default function ComparePage() {
  const { products, removeProduct, clearAll } = useComparisonStore()
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] Comparison products:", products)
  }, [products])

  useEffect(() => {
    if (products.length === 0) {
      router.push("/catalog")
    }
  }, [products.length, router])

  if (products.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">So sánh sản phẩm</h1>
              <p className="text-muted-foreground">Đang so sánh {products.length} sản phẩm</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearAll}>
                Xóa tất cả
              </Button>
              <Button variant="outline" asChild>
                <Link href="/catalog">Thêm sản phẩm</Link>
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Product Headers */}
              <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
                <div className="sticky left-0 bg-background z-10"></div>
                {products.map((product) => (
                  <Card key={product.id} className="relative">
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-background hover:bg-secondary transition-colors z-10"
                      aria-label="Remove product"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="p-4">
                      <Link href={`/product/${product.id}`}>
                        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-secondary">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">{product.brand}</div>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-foreground">{product.name}</h3>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Comparison Rows */}
              <div className="space-y-1">
                {/* Price */}
                <ComparisonRow
                  label="Giá"
                  products={products}
                  renderCell={(product) => (
                    <div>
                      <div className="font-bold text-primary font-serif text-2xl">
                        {product.price.toLocaleString("vi-VN")}đ
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString("vi-VN")}đ
                        </div>
                      )}
                    </div>
                  )}
                />

                {/* Volume */}
                <ComparisonRow
                  label="Dung tích"
                  products={products}
                  renderCell={(product, index) => {
                    const fallback = getFallbackData(index)
                    return <div className="font-medium">{product.volume || fallback.volume}</div>
                  }}
                />

                {/* Rating */}
                <ComparisonRow
                  label="Đánh giá"
                  products={products}
                  renderCell={(product, index) => {
                    const fallback = getFallbackData(index)
                    const rating = product.rating || fallback.rating
                    const reviewCount = product.reviewCount || fallback.reviewCount
                    return (
                      <div className="flex items-center gap-2 my-1.5">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-semibold">{rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({reviewCount})</span>
                      </div>
                    )
                  }}
                />

                

                {/* Suitable For */}
                <ComparisonRow
                  label="Phù hợp với"
                  products={products}
                  renderCell={(product, index) => {
                    const fallback = getFallbackData(index)
                    const skinTypes =
                      Array.isArray(product.suitableFor) && product.suitableFor.length > 0
                        ? product.suitableFor
                        : fallback.suitableFor
                    return (
                      <div className="flex flex-wrap gap-1">
                        {skinTypes.map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {skinTypeLabels[type] || type}
                          </Badge>
                        ))}
                      </div>
                    )
                  }}
                />

                {/* Concerns */}
                <ComparisonRow
                  label="Giải quyết"
                  products={products}
                  renderCell={(product, index) => {
                    const fallback = getFallbackData(index)
                    const concerns =
                      Array.isArray(product.concerns) && product.concerns.length > 0
                        ? product.concerns
                        : fallback.concerns
                    return (
                      <div className="flex flex-wrap gap-1">
                        {concerns.map((concern) => (
                          <Badge key={concern} variant="outline" className="text-xs">
                            {concernLabels[concern] || concern}
                          </Badge>
                        ))}
                      </div>
                    )
                  }}
                />

                

                {/* Key Ingredients */}
                <ComparisonRow
                  label="Thành phần chính"
                  products={products}
                  renderCell={(product, index) => {
                    const fallback = getFallbackData(index)
                    const ingredients =
                      Array.isArray(product.ingredients) && product.ingredients.length > 0
                        ? product.ingredients
                        : fallback.ingredients
                    return (
                      <div className="space-y-2">
                        {ingredients.slice(0, 3).map((ingredient, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-foreground">
                                {ingredient.nameVi || ingredient.name}
                              </div>
                              <div className="text-xs text-muted-foreground">{ingredient.benefit}</div>
                            </div>
                          </div>
                        ))}
                        {ingredients.length > 3 && (
                          <Link href={`/product/${product.id}`} className="text-xs text-primary hover:underline">
                            Xem tất cả {ingredients.length} thành phần
                          </Link>
                        )}
                      </div>
                    )
                  }}
                />

                {/* Actions */}
                <ComparisonRow
                  label=""
                  products={products}
                  renderCell={(product) => (
                    <div className="space-y-2">
                      <Button className="w-full" size="sm">
                        Mua ngay
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" size="sm" asChild>
                        <Link href={`/product/${product.id}`}>Xem chi tiết</Link>
                      </Button>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

interface ComparisonRowProps {
  label: string
  products: any[]
  renderCell: (product: any, index: number) => React.ReactNode
}

function ComparisonRow({ label, products, renderCell }: ComparisonRowProps) {
  return (
    <div
      className="grid gap-4 items-start my-0 py-3 border-b-2"
      style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
    >
      <div className="sticky left-0 bg-background z-10 font-semibold text-sm text-foreground py-2">{label}</div>
      {products.map((product, index) => (
        <div key={product.id} className="p-2 text-sm py-0">
          {renderCell(product, index)}
        </div>
      ))}
    </div>
  )
}
