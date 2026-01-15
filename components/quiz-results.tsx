"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Sparkles, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const recommendedProducts = [
  {
    id: 1,
    name: "Serum Vitamin C",
    category: "Chăm sóc da",
    price: "580.000₫",
    rating: 4.8,
    reviews: 128,
    image: "/vitamin-c-serum-bottle-minimal.jpg",
    reason: "Phù hợp cho da cần làm sáng và chống lão hóa",
  },
  {
    id: 2,
    name: "Kem dưỡng ẩm",
    category: "Dưỡng da",
    price: "420.000₫",
    rating: 4.9,
    reviews: 256,
    image: "/moisturizer-jar-elegant.jpg",
    reason: "Cung cấp độ ẩm sâu cho làn da của bạn",
  },
  {
    id: 6,
    name: "Kem chống nắng",
    category: "Bảo vệ da",
    price: "380.000₫",
    rating: 4.9,
    reviews: 423,
    image: "/sunscreen-tube-elegant-minimal.jpg",
    reason: "Bảo vệ da khỏi tác hại của tia UV",
  },
]

const skinProfile = {
  skinType: "Da hỗn hợp",
  concerns: ["Dưỡng ẩm", "Làm sáng da"],
  ageGroup: "25-34 tuổi",
  budget: "Trung bình",
}

export function QuizResults() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Success Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold text-balance md:text-5xl">
            Kết quả phân tích làn da của bạn
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Dựa trên câu trả lời của bạn, chúng tôi đã chọn ra những sản phẩm phù hợp nhất
          </p>
        </div>

        {/* Skin Profile */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardContent className="p-8">
            <h2 className="mb-6 flex items-center gap-2 font-serif text-2xl font-bold">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              Hồ sơ làn da của bạn
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Loại da</p>
                <p className="font-semibold">{skinProfile.skinType}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Độ tuổi</p>
                <p className="font-semibold">{skinProfile.ageGroup}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Ngân sách</p>
                <p className="font-semibold">{skinProfile.budget}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Mối quan tâm</p>
                <p className="font-semibold">{skinProfile.concerns.join(", ")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Products */}
        <div className="mb-8">
          <h2 className="mb-6 font-serif text-3xl font-bold">Sản phẩm được đề xuất cho bạn</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="group h-full cursor-pointer overflow-hidden border-border transition-all hover:shadow-lg">
                  <div className="aspect-square overflow-hidden bg-card">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <p className="mb-2 text-sm text-muted-foreground">{product.category}</p>
                    <h3 className="mb-2 font-serif text-xl font-semibold">{product.name}</h3>

                    <div className="mb-3 rounded-md bg-primary/10 p-3">
                      <p className="text-sm leading-relaxed text-primary">
                        <strong>Tại sao phù hợp:</strong> {product.reason}
                      </p>
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews} đánh giá)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-serif text-2xl font-bold text-primary">{product.price}</p>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/catalog">
            <Button size="lg" className="w-full sm:w-auto">
              Khám phá thêm sản phẩm
            </Button>
          </Link>
          <Link href="/skin-quiz">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              Làm lại bài test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
