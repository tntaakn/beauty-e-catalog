"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Share2, Check, Minus, Plus } from "lucide-react"
import { ProductReviews } from "@/components/product-reviews"
import { ComparisonButton } from "@/components/comparison-button"

// Mock data - in real app, this would come from API/database
const productData: Record<string, any> = {
  "1": {
    name: "Serum Vitamin C",
    category: "Chăm sóc da",
    price: "580.000₫",
    rating: 4.8,
    reviews: 128,
    image: "/vitamin-c-serum-bottle-minimal.jpg",
    images: [
      "/vitamin-c-serum-bottle-minimal.jpg",
      "/serum-vitamin-c-bottle-angle-2.jpg",
      "/serum-texture-closeup.jpg",
    ],
    description:
      "Serum Vitamin C cao cấp giúp làm sáng da, mờ thâm nám và chống lão hóa hiệu quả. Công thức đột phá với 20% Pure Vitamin C kết hợp cùng Vitamin E và Ferulic Acid mang lại làn da rạng rỡ, đều màu sau 4 tuần sử dụng.",
    ingredients: [
      "20% Pure Vitamin C (L-Ascorbic Acid)",
      "Vitamin E",
      "Ferulic Acid",
      "Hyaluronic Acid",
      "Niacinamide",
    ],
    benefits: [
      "Làm sáng da, mờ thâm nám",
      "Chống oxy hóa mạnh mẽ",
      "Kích thích sản sinh collagen",
      "Đều màu da, cải thiện sắc tố",
      "Bảo vệ da khỏi tác hại môi trường",
    ],
    usage:
      "Sử dụng 2-3 giọt sau bước làm sạch và cân bằng da, thoa đều lên mặt và cổ. Dùng buổi sáng và tối. Nên kết hợp với kem chống nắng khi dùng ban ngày.",
    skinType: ["Mọi loại da", "Đặc biệt phù hợp với da xỉn màu, có thâm nám"],
    inStock: true,
  },
  "2": {
    name: "Kem dưỡng ẩm",
    category: "Dưỡng da",
    price: "420.000₫",
    rating: 4.9,
    reviews: 256,
    image: "/moisturizer-jar-elegant.jpg",
    images: ["/moisturizer-jar-elegant.jpg", "/moisturizer-jar-open.jpg", "/moisturizer-cream-texture.jpg"],
    description:
      "Kem dưỡng ẩm chuyên sâu với công thức gel-cream nhẹ mịn, thấm nhanh. Cung cấp độ ẩm tối ưu cho làn da suốt 48 giờ, giúp da mềm mại, căng mọng và khỏe mạnh.",
    ingredients: ["Hyaluronic Acid", "Ceramide Complex", "Glycerin", "Squalane", "Peptides"],
    benefits: [
      "Dưỡng ẩm sâu 48 giờ",
      "Củng cố hàng rào bảo vệ da",
      "Làm dịu da nhạy cảm",
      "Ngăn ngừa mất nước",
      "Cải thiện độ đàn hồi",
    ],
    usage:
      "Thoa một lượng vừa đủ lên mặt và cổ sau bước serum. Massage nhẹ nhàng để sản phẩm thấm sâu. Sử dụng sáng và tối.",
    skinType: ["Da khô", "Da thường", "Da hỗn hợp thiên khô"],
    inStock: true,
  },
}

export function ProductDetailContent({ productId }: { productId: string }) {
  const product = productData[productId] || productData["1"]
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity((q) => q + 1)
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1))

  const productForComparison = {
    id: Number.parseInt(productId),
    name: product.name,
    category: product.category,
    price: product.price,
    rating: product.rating,
    reviews: product.reviews,
    image: product.image,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === idx ? "border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">{product.category}</p>
            <h1 className="mb-4 font-serif text-4xl font-bold">{product.name}</h1>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} đánh giá)</span>
              </div>
              {product.inStock && <Badge variant="secondary">Còn hàng</Badge>}
            </div>
          </div>

          <div className="border-y border-border py-6">
            <p className="font-serif text-4xl font-bold text-primary">{product.price}</p>
          </div>

          <p className="leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">Số lượng</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={incrementQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Thêm vào giỏ hàng
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <ComparisonButton product={productForComparison} size="lg" showText={false} />
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="mb-4 font-serif text-lg font-bold">Lợi ích chính</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredients">Thành phần</TabsTrigger>
            <TabsTrigger value="usage">Cách sử dụng</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-serif text-xl font-bold">Thành phần chính</h3>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="leading-relaxed">{ingredient}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <h4 className="mb-2 font-semibold">Phù hợp với:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.skinType.map((type: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="usage" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-serif text-xl font-bold">Hướng dẫn sử dụng</h3>
                <p className="leading-relaxed">{product.usage}</p>
                <div className="mt-6 rounded-lg bg-muted/50 p-4">
                  <p className="text-sm leading-relaxed">
                    <strong>Lưu ý:</strong> Nên thử sản phẩm trên da tay trước khi sử dụng. Tránh tiếp xúc với mắt. Bảo
                    quản nơi khô ráo, thoáng mát.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <ProductReviews productId={productId} rating={product.rating} totalReviews={product.reviews} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
