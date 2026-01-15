"use client"

import { useComparisonStore } from "@/lib/comparison-store"
import { sampleProducts } from "@/lib/product-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Star, Plus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ComparisonTable() {
  const { products: storeProducts, removeProduct, clearAll } = useComparisonStore()

  const mockProducts = [sampleProducts[0], sampleProducts[1], sampleProducts[2]]
  const products = storeProducts && storeProducts.length > 0 ? storeProducts : mockProducts

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
    <div className="bg-[#fcf1e3] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-2xl font-bold">So sánh sản phẩm</h1>
            <p className="text-sm text-muted-foreground">Đang so sánh {products.length} sản phẩm</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={clearAll} className="bg-white">
              Xóa tất cả
            </Button>
            <Button variant="outline" asChild className="bg-white">
              <Link href="/catalog">
                <Plus className="mr-2 h-4 w-4" />
                Thêm sản phẩm
              </Link>
            </Button>
          </div>
        </div>

        <div className={`grid gap-4 mb-8 ${products.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden bg-white border-0 shadow-sm">
              <div className="relative aspect-square bg-background">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm"
                  onClick={() => removeProduct(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs text-muted-foreground">{product.brand}</p>
                <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Price Row */}
          <div className="grid border-b" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
            <div className="p-4 bg-background/50 font-medium text-sm border-r">Giá</div>
            {products.map((product) => (
              <div key={product.id} className="p-4 border-r last:border-r-0">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-[#e8492a]">{product.price.toLocaleString("vi-VN")}đ</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Volume Row */}
          <div className="grid border-b" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
            <div className="p-4 bg-background/50 font-medium text-sm border-r">Dung tích</div>
            {products.map((product) => (
              <div key={product.id} className="p-4 border-r last:border-r-0">
                <span className="text-sm">{product.volume}</span>
              </div>
            ))}
          </div>

          {/* Rating Row */}
          <div className="grid border-b" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
            <div className="p-4 bg-background/50 font-medium text-sm border-r">Đánh giá</div>
            {products.map((product) => (
              <div key={product.id} className="p-4 border-r last:border-r-0">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-[#e8492a] text-[#e8492a]" />
                  <span className="font-medium text-sm">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                </div>
              </div>
            ))}
          </div>

          {/* Suitable For Row */}
          <div className="grid border-b" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
            <div className="p-4 bg-background/50 font-medium text-sm border-r">Phù hợp với</div>
            {products.map((product) => (
              <div key={product.id} className="p-4 border-r last:border-r-0">
                <div className="flex flex-wrap gap-1.5">
                  {product.suitableFor?.map((type) => (
                    <Badge key={type} variant="secondary" className="rounded-full text-xs px-2 py-0.5 bg-background">
                      {type === "oily"
                        ? "Da dầu"
                        : type === "dry"
                          ? "Da khô"
                          : type === "combination"
                            ? "Da hỗn hợp"
                            : type === "sensitive"
                              ? "Da nhạy cảm"
                              : "Da thường"}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Concerns Row */}
          <div className="grid border-b" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
            <div className="p-4 bg-background/50 font-medium text-sm border-r">Giải quyết</div>
            {products.map((product) => (
              <div key={product.id} className="p-4 border-r last:border-r-0">
                <div className="flex flex-wrap gap-1.5">
                  {product.concerns?.map((concern) => (
                    <Badge key={concern} variant="secondary" className="rounded-full text-xs px-2 py-0.5 bg-background">
                      {concern === "acne"
                        ? "Mụn"
                        : concern === "darkspots"
                          ? "Thâm nám"
                          : concern === "aging"
                            ? "Lão hóa"
                            : concern === "dryness"
                              ? "Khô da"
                              : concern === "sensitivity"
                                ? "Nhạy cảm"
                                : "Nhờn"}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Ingredients Row */}
          <div className="grid" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
            <div className="p-4 bg-background/50 font-medium text-sm border-r">Thành phần chính</div>
            {products.map((product) => (
              <div key={product.id} className="p-4 border-r last:border-r-0">
                <div className="space-y-2">
                  {product.ingredients?.slice(0, 3).map((ingredient, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#e8492a] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-tight">{ingredient.nameVi}</p>
                        <p className="text-xs text-muted-foreground leading-tight mt-0.5">{ingredient.benefit}</p>
                      </div>
                    </div>
                  ))}
                  {product.ingredients && product.ingredients.length > 3 && (
                    <Button variant="link" className="h-auto p-0 text-xs text-[#e8492a]" asChild>
                      <Link href={`/product/${product.id}`}>Xem tất cả {product.ingredients.length} thành phần</Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid gap-4 mt-6 ${products.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {products.map((product) => (
            <div key={product.id} className="space-y-2">
              <Button className="w-full bg-[#e8492a] hover:bg-[#e8492a]/90 text-white">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Mua ngay
              </Button>
              <Button variant="outline" className="w-full bg-white" asChild>
                <Link href={`/product/${product.id}`}>Xem chi tiết</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
