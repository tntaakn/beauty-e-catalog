import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SkinQuizForm } from "@/components/skin-quiz-form"

export default function SkinQuizPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-4xl font-bold text-balance md:text-5xl">
              Tìm sản phẩm phù hợp với bạn
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Trả lời một vài câu hỏi để chúng tôi có thể gợi ý những sản phẩm phù hợp nhất với làn da và nhu cầu của
              bạn
            </p>
          </div>
          <SkinQuizForm />
        </div>
      </div>
      <Footer />
    </main>
  )
}
