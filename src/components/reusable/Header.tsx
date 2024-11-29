'use client'
import Image from 'next/image'
import React from 'react'
import logo from '@/assets/icons/giritoday-logo.png'
import { ShoppingCart } from 'lucide-react'
import useStore from '@/store'
import { useRouter } from 'next/navigation'

const Header = () => {
  const {cartItems} = useStore()
  const router = useRouter()
  return (
    <main className='' aria-label="Header Section">
      <div className='flex justify-between bg-[#f1f1f2] paddingX py-2'>
        <p className=''>GiriToday Marketplace</p>
        <p>Buy On GiriToday</p>
        <p className='invisible'></p>
      </div>
      <div className='flex justify-between items-center gap-x-4 paddingX bg-white py-4'>
        <div className='flex items-center gap-3'>
          <Image src={logo} alt='GiriToday Logo' width={50} height={50} loading="lazy"
            className='cursor-pointer'
            onClick={() => router.push('/products')}
          />
          <button className='font-medium' onClick={() => router.push('/products')}>Products</button>
          </div>
        <button className='flex items-center gap-2 relative'
          onClick={() => router.push('/cart')}
        >
          <ShoppingCart />
          <p className='text-xs absolute -top-[17px] left-3 bg-secondary-normal text-white rounded-[50%] px-3 py-1'>
            {cartItems?.length}
          </p>
          <p>Cart</p>
        </button>
      </div>
    </main>
  )
}

export default Header