"use client"

import type React from "react"
import { useState } from "react"
import { Heart, ShoppingBag, Search, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/catalog" },
    { label: "Gợi ý sản phẩm", href: "/skin-quiz" },
    { label: "Liên hệ", href: "#newsletter" },
  ]

  const handleScrollToNewsletter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.getAttribute("href") === "#newsletter") {
      e.preventDefault()
      const newsletterSection = document.querySelector("#newsletter")
      if (newsletterSection) {
        newsletterSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-4">
        <Link href="/" className="flex-shrink-0">
          <h1 className="font-serif text-2xl font-bold text-primary">BeautyFind</h1>
        </Link>

        <div className="hidden flex-1 max-w-md md:flex">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm, thương hiệu"
              className="w-full pl-10 pr-4 bg-muted/50 border-border text-sm rounded-xl h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleScrollToNewsletter}
              className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex h-9 w-9">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Yêu thích</span>
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:flex h-9 w-9">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Giỏ hàng</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 pt-8">
                <form onSubmit={handleSearch} className="relative w-full mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Tìm kiếm..."
                    className="w-full pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={handleScrollToNewsletter}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
