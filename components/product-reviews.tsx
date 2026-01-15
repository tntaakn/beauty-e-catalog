"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, ThumbsUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const mockReviews = [
  {
    id: 1,
    author: "Minh Anh",
    rating: 5,
    date: "2 tuần trước",
    comment:
      "Sản phẩm rất tuyệt vời! Da mình sáng lên rõ rệt sau 3 tuần sử dụng. Mùi hương dễ chịu, thấm nhanh không gây bết dính.",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    author: "Thu Hà",
    rating: 4,
    date: "1 tháng trước",
    comment:
      "Chất lượng tốt, đóng gói cẩn thận. Hiệu quả nhưng cần kiên trì sử dụng mới thấy rõ. Giá hơi cao nhưng xứng đáng.",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    author: "Quỳnh Nga",
    rating: 5,
    date: "1 tháng trước",
    comment: "Đã mua lần 2 rồi, sản phẩm yêu thích của mình. Da mịn màng, thâm nám mờ đi nhiều. Sẽ tiếp tục ủng hộ!",
    helpful: 15,
    verified: true,
  },
]

export function ProductReviews({
  productId,
  rating,
  totalReviews,
}: { productId: string; rating: number; totalReviews: number }) {
  const [showWriteReview, setShowWriteReview] = useState(false)

  const ratingDistribution = [
    { stars: 5, percentage: 75 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ]

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="text-center">
              <div className="mb-2 font-serif text-5xl font-bold">{rating}</div>
              <div className="mb-2 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{totalReviews} đánh giá</p>
            </div>
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="w-12 text-sm">{item.stars} sao</span>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="w-12 text-right text-sm text-muted-foreground">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button onClick={() => setShowWriteReview(!showWriteReview)}>
              {showWriteReview ? "Hủy" : "Viết đánh giá"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Form */}
      {showWriteReview && (
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 font-serif text-xl font-bold">Viết đánh giá của bạn</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Đánh giá của bạn</label>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <button key={i} className="transition-transform hover:scale-110">
                      <Star className="h-6 w-6 text-muted hover:fill-primary hover:text-primary" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Nhận xét của bạn</label>
                <Textarea placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..." rows={4} />
              </div>
              <Button>Gửi đánh giá</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                            />
                          ))}
                        </div>
                        {review.verified && <span className="text-xs text-muted-foreground">(Đã mua hàng)</span>}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="mb-3 leading-relaxed">{review.comment}</p>
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Hữu ích ({review.helpful})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
