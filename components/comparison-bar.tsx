"use client"

import { X, GitCompareArrows } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useComparisonStore } from "@/lib/comparison-store"

export function ComparisonBar() {
  const { products, removeProduct, clearAll } = useComparisonStore()

  if (products.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GitCompareArrows className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">So sánh sản phẩm ({products.length}/3)</span>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-2xl overflow-x-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative flex items-center gap-2 bg-secondary rounded-lg p-2 min-w-[200px]"
              >
                <div className="relative w-12 h-12 rounded overflow-hidden bg-background flex-shrink-0">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.price.toLocaleString("vi-VN")}đ</p>
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="flex-shrink-0 p-1 hover:bg-background rounded"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearAll}>
              Xóa tất cả
            </Button>
            <Button size="sm" asChild disabled={products.length < 2}>
              <Link href="/compare">So sánh ngay</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
