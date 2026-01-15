"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section id="newsletter" className="border-y border-border bg-card py-16 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">Nhận thông tin mới nhất</h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Đăng ký để nhận tin tức về sản phẩm mới, ưu đãi đặc biệt và những bí quyết làm đẹp từ chuyên gia
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-xl py-0 my-1 leading-7"
            />
            <Button className="rounded-xl" type="submit" size="lg">
              Đăng ký ngay
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất cứ lúc nào.
          </p>
        </div>
      </div>
    </section>
  )
}
