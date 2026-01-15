"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

const quizQuestions = [
  {
    id: 1,
    question: "Loại da của bạn là gì?",
    type: "single",
    options: [
      { value: "da-kho", label: "Da khô - Da thường xuyên cảm thấy căng, khô" },
      { value: "da-dau", label: "Da dầu - Da có vẻ bóng, dễ bị mụn" },
      { value: "da-hon-hop", label: "Da hỗn hợp - Vùng T-zone dầu, má khô" },
      { value: "da-thuong", label: "Da thường - Da cân bằng, ít vấn đề" },
      { value: "da-nhay-cam", label: "Da nhạy cảm - Da dễ kích ứng, đỏ" },
    ],
  },
  {
    id: 2,
    question: "Độ tuổi của bạn?",
    type: "single",
    options: [
      { value: "18-24", label: "18-24 tuổi" },
      { value: "25-34", label: "25-34 tuổi" },
      { value: "35-44", label: "35-44 tuổi" },
      { value: "45+", label: "45 tuổi trở lên" },
    ],
  },
  {
    id: 3,
    question: "Mối quan tâm chính của bạn là gì? (Chọn tất cả phù hợp)",
    type: "multiple",
    options: [
      { value: "mun", label: "Mụn và vết thâm" },
      { value: "lao-hoa", label: "Chống lão hóa, nếp nhăn" },
      { value: "duong-am", label: "Dưỡng ẩm sâu" },
      { value: "sang-da", label: "Làm sáng da, đều màu da" },
      { value: "lo-chan-long", label: "Thu nhỏ lỗ chân lông" },
      { value: "bao-ve", label: "Bảo vệ da khỏi tác hại môi trường" },
    ],
  },
  {
    id: 4,
    question: "Bạn có dị ứng với thành phần nào không?",
    type: "multiple",
    options: [
      { value: "huong-lieu", label: "Hương liệu" },
      { value: "paraben", label: "Paraben" },
      { value: "sulfate", label: "Sulfate" },
      { value: "alcohol", label: "Alcohol" },
      { value: "khong", label: "Không có dị ứng" },
    ],
  },
  {
    id: 5,
    question: "Ngân sách cho sản phẩm chăm sóc da?",
    type: "single",
    options: [
      { value: "budget", label: "Tiết kiệm (< 300.000₫)" },
      { value: "mid", label: "Trung bình (300.000₫ - 600.000₫)" },
      { value: "premium", label: "Cao cấp (> 600.000₫)" },
      { value: "flexible", label: "Linh hoạt tùy sản phẩm" },
    ],
  },
]

export function SkinQuizForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})

  const currentQuestion = quizQuestions[currentStep]
  const isLastQuestion = currentStep === quizQuestions.length - 1
  const canProceed =
    answers[currentQuestion.id] !== undefined &&
    (Array.isArray(answers[currentQuestion.id]) ? (answers[currentQuestion.id] as string[]).length > 0 : true)

  const handleSingleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const handleMultipleAnswer = (value: string, checked: boolean) => {
    const currentAnswers = (answers[currentQuestion.id] as string[]) || []
    if (checked) {
      setAnswers({ ...answers, [currentQuestion.id]: [...currentAnswers, value] })
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: currentAnswers.filter((v) => v !== value) })
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      // Submit quiz and navigate to results
      console.log("Quiz answers:", answers)
      router.push("/skin-quiz/results")
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">
            Câu hỏi {currentStep + 1} / {quizQuestions.length}
          </span>
          <span className="text-muted-foreground">{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="border-border">
        <CardContent className="p-8">
          <h2 className="mb-8 font-serif text-2xl font-bold text-balance">{currentQuestion.question}</h2>

          {currentQuestion.type === "single" ? (
            <RadioGroup
              value={answers[currentQuestion.id] as string}
              onValueChange={handleSingleAnswer}
              className="space-y-4"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-start gap-3">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                  <Label htmlFor={option.value} className="cursor-pointer font-normal leading-relaxed">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-start gap-3">
                  <Checkbox
                    id={option.value}
                    checked={((answers[currentQuestion.id] as string[]) || []).includes(option.value)}
                    onCheckedChange={(checked) => handleMultipleAnswer(option.value, checked as boolean)}
                  />
                  <Label htmlFor={option.value} className="cursor-pointer font-normal leading-relaxed">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0} size="lg">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <Button onClick={handleNext} disabled={!canProceed} size="lg" className="min-w-[140px]">
          {isLastQuestion ? (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Xem kết quả
            </>
          ) : (
            <>
              Tiếp theo
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
