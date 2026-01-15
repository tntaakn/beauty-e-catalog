import { Facebook, Instagram, Mail } from "lucide-react"

export function Footer() {
  const footerLinks = {
    "Về chúng tôi": ["Giới thiệu", "Câu chuyện thương hiệu", "Tuyển dụng", "Liên hệ"],
    "Hỗ trợ": ["Hướng dẫn mua hàng", "Chính sách đổi trả", "Vận chuyển", "Câu hỏi thường gặp"],
    "Thông tin": ["Tin tức", "Blog làm đẹp", "Khuyến mãi", "Sự kiện"],
  }

  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">BeautyFind</h2>
            <p className="mb-6 leading-relaxed text-muted-foreground text-pretty">
              Đồng hành cùng bạn tìm ra vẻ đẹp của bản thân. Chất lượng cao cấp, dịch vụ tận tâm.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 font-semibold">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">© 2025 BeautyFind. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
