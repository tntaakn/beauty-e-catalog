"use client"

import type React from "react"
import { GitCompareArrows } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useComparisonStore } from "@/lib/comparison-store"
import type { Product } from "@/lib/product-data"
import { useToast } from "@/hooks/use-toast"

interface ComparisonButtonProps {
  product: Product
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ComparisonButton({ product, variant = "outline", size = "sm" }: ComparisonButtonProps) {
  const { addProduct, removeProduct, isInComparison, products } = useComparisonStore()
  const inComparison = isInComparison(product.id)
  const { toast } = useToast()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (inComparison) {
      removeProduct(product.id)
      toast({
        title: "Đã xóa khỏi danh sách so sánh",
        description: product.name,
      })
    } else {
      if (products.length >= 3) {
        toast({
          title: "Đã đạt giới hạn",
          description: "Bạn chỉ có thể so sánh tối đa 3 sản phẩm",
          variant: "destructive",
        })
        return
      }
      addProduct(product)
      toast({
        title: "Đã thêm vào danh sách so sánh",
        description: product.name,
      })
    }
  }

  return (
    <Button variant={inComparison ? "default" : variant} size={size} onClick={handleClick} className="gap-2">
      <GitCompareArrows className="h-4 w-4" />
      {inComparison ? "Đã thêm" : "So sánh"}
    </Button>
  )
}
