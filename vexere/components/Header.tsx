'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Globe, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [language, setLanguage] = useState('VI')

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-12 bg-primary text-white text-sm flex items-center justify-center">
          Cam kết hoàn 150% nếu nhà xe không cung cấp dịch vụ vận chuyển (*)
        </div>
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image 
                src="/placeholder.svg?height=32&width=100" 
                alt="VeXeRe" 
                width={100} 
                height={32}
                className="h-8"
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="#" className="text-gray-600 hover:text-primary">
                Đơn hàng của tôi
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary">
                Mở bán vé trên Vexere
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary">
                Trở thành đối tác
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-1">
                <Globe className="h-4 w-4" />
                {language}
              </Button>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                <Phone className="h-4 w-4" />
                Hotline 24/7
              </Button>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

