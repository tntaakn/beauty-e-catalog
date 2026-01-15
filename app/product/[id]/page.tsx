import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailContent } from "@/components/product-detail-content"
import { RelatedProducts } from "@/components/related-products"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen">
      <Header />
      <ProductDetailContent productId={params.id} />
      <RelatedProducts />
      <Footer />
    </main>
  )
}
