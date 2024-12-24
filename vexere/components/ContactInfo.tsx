import { Phone } from 'lucide-react'

export default function ContactInfo() {
  return (
    <footer className="bg-[#001833] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Công ty TNHH Thương mại Dịch vụ Vexere
          </h2>
          <div className="space-y-2 text-gray-300">
            <p>
              Miền Nam: Lầu 2, tòa nhà H3 Circo Hoàng Diệu, 384 Hoàng Diệu, Phường 6, Quận 4, TP.HCM
            </p>
            <p>
              Miền Bắc: Tầng 3, số 101 Láng Hạ, Đống Đa, Hà Nội
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">Hotline: 1900 545541</span>
              <span className="text-sm">(7h-21h, T2-CN)</span>
            </div>
          </div>
          <div className="mt-6 text-sm text-gray-400">
            <p>Facebook Page, Zalo OA</p>
            <p>Bản quyền thuộc Vexere.com</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

