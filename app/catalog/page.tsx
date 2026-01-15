import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CatalogContent } from "@/components/catalog-content"

export default function CatalogPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
        <CatalogContent />
      </Suspense>
      <Footer />
    </main>
  )
}
