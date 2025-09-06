"use client"
import { Button } from '@/components/ui/button'
import { Check, } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import React from 'react'


function page() {
  const router = useRouter()

  setTimeout(() => {
    router.push("/")
  }, 3000);

  return (
    <div className="p-14">
      <div className="glass-card p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground mb-6">
          Your reservation has been successfully confirmed.
        </p>
        <p className="font-medium mb-8">
          Booking Reference: <span className="text-primary">MRS-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
        </p>
        <Button varient="primary">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}

export default page