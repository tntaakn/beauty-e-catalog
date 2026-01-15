import { Header } from "@/components/header"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { ProductCategoriesSection } from "@/components/product-categories-section"
import { PersonalizedRecommendations } from "@/components/personalized-recommendations"
import { FeaturedProductsSection } from "@/components/featured-products-section"
import { getTrendingProducts, getFeaturedProducts } from "@/lib/product-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const trendingProducts = getTrendingProducts()
  const featuredProducts = getFeaturedProducts()

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="font-medium uppercase tracking-wider text-primary text-base">Beauty Catalog 2025</p>
                <h1 className="font-serif text-5xl font-bold leading-tight text-balance md:text-6xl lg:text-7xl">
                  Tìm ra vẻ đẹp
                  <br />
                  <span className="text-primary">của riêng bạn</span>
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                  Đồng hành cùng bạn trong hành trình khám phá và nuôi dưỡng vẻ đẹp tự nhiên. Mỗi sản phẩm là một bước
                  đến gần hơn với phiên bản tốt nhất của chính mình.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="group" asChild>
                  <Link href="/skin-quiz">
                    Tìm sản phẩm phù hợp
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/catalog">Khám phá sản phẩm</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                <img
                  src="/elegant-beauty-products-flatlay-minimalist.jpg"
                  alt="Beauty products"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="border-y border-border bg-card py-16 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-6 font-serif text-4xl font-bold text-balance md:text-5xl">
              Đồng hành cùng bạn tìm ra
              <p className="py-1">vẻ đẹp của bản thân</p>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Sứ mệnh của chúng tôi là giúp bạn khám phá và tôn vinh nét đẹp độc đáo đó thông qua những sản phẩm chất
              lượng cao và phù hợp nhất với bạn.
            </p>
          </div>
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-16">
              <div className="flex flex-col items-center text-center">
                <Sparkles className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Bộ lọc thông minh</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tìm kiếm theo thành phần, loại da và mối quan tâm cụ thể
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Thông tin minh bạch</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Phân tích chi tiết thành phần và công dụng từng sản phẩm
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">Đánh giá xác thực</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nhận xét từ người dùng đã mua và sử dụng thực tế
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PersonalizedRecommendations />

      {/* Product Categories Section */}
      <ProductCategoriesSection />

      {/* Featured Products Section */}
      <FeaturedProductsSection products={featuredProducts} />

      <Newsletter />
      <Footer />
    </main>
  )
}
