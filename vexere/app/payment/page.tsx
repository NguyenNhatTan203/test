import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const paymentMethods = [
  {
    id: 'momo',
    name: 'Ví MoMo',
    icon: '/placeholder.svg?height=40&width=40',
    description: 'Thanh toán qua ví điện tử MoMo'
  },
  {
    id: 'zalopay',
    name: 'ZaloPay',
    icon: '/placeholder.svg?height=40&width=40',
    description: 'Thanh toán qua ví điện tử ZaloPay'
  },
  {
    id: 'vnpay',
    name: 'VNPay QR',
    icon: '/placeholder.svg?height=40&width=40',
    description: 'Quét mã QR để thanh toán'
  },
  {
    id: 'bank',
    name: 'Thẻ ATM / Internet Banking',
    icon: '/placeholder.svg?height=40&width=40',
    description: 'Hỗ trợ hầu hết ngân hàng tại Việt Nam'
  },
  {
    id: 'credit',
    name: 'Thẻ tín dụng / Ghi nợ quốc tế',
    icon: '/placeholder.svg?height=40&width=40',
    description: 'Hỗ trợ Visa, MasterCard, JCB'
  }
]

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Thanh toán</h1>
          
          <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Chọn phương thức thanh toán</h2>
              <RadioGroup defaultValue="momo">
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-4">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center flex-1 cursor-pointer">
                        <Image
                          src={method.icon}
                          alt={method.name}
                          width={40}
                          height={40}
                          className="mr-4"
                        />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-500">{method.description}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Tổng thanh toán</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Giá vé</span>
                  <span>500.000đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí dịch vụ</span>
                  <span>20.000đ</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Tổng cộng</span>
                    <span className="text-primary">520.000đ</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6">Thanh toán ngay</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

