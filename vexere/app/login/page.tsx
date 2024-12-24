'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login')

  return (
    <div className="min-h-[calc(100vh-128px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-[480px] mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="VeXeRe"
              width={120}
              height={40}
              className="mx-auto mb-6"
            />
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                <TabsTrigger value="register">Đăng ký</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

