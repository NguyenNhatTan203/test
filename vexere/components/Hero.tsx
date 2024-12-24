import Image from 'next/image'

export default function Hero() {
  return (
    <div className="container mx-auto px-4 pt-8">
      <div className="relative h-40 flex justify-center">
        <Image
          src="/placeholder.svg?height=160&width=720"
          alt="Sale nối chơi năm"
          width={720}
          height={160}
          className="object-contain"
        />
      </div>
      <h1 className="text-white text-center text-xl mt-4">
        Vexere - Cam kết hoàn 150% nếu nhà xe không cung cấp dịch vụ vận chuyển (*)
      </h1>
    </div>
  )
}

