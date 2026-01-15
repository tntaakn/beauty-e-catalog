"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { sampleProducts, type Product } from "@/lib/product-data"

export function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Product[]>([])

  useEffect(() => {
    // Get user's quiz results from localStorage
    const savedQuizResults = localStorage.getItem("beauty-quiz-results")

    if (savedQuizResults) {
      const { skinType, concerns } = JSON.parse(savedQuizResults)

      // Filter products based on saved preferences
      const filtered = sampleProducts
        .filter((product) => {
          const matchesSkinType = product.suitableFor.includes(skinType)
          const matchesConcerns = concerns.some((concern: string) => product.concerns.includes(concern))
          return matchesSkinType && matchesConcerns
        })
        .slice(0, 4)

      setRecommendations(filtered)
    } else {
      // Show trending products if no quiz taken
      setRecommendations(sampleProducts.filter((p) => p.trending).slice(0, 4))
    }
  }, [])

  if (recommendations.length === 0) return null

  return (
    <section className="px-4 bg-gradient-to-b from-secondary/30 to-background py-24">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold font-serif text-balance text-foreground text-3xl">Gợi ý cho bạn</h2>
              <p className="text-muted-foreground py-0.5">Dựa trên loại da và nhu cầu của bạn</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/skin-quiz">
              Làm trắc nghiệm <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
