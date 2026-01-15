import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QuizResults } from "@/components/quiz-results"

export default function QuizResultsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <QuizResults />
      <Footer />
    </main>
  )
}
