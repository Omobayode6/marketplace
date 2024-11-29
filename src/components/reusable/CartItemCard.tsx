import { Trash2 } from 'lucide-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { formatToNairaCurrency } from './formartCurrency';

export type Props = {
  id: string;
  img: string;
  name: string;
  seller:string;
  price: number;
  oldPrice: number;
  qty: number;
  removeItem: any;
  removeFromCart: any;
  addToCart: any;
}

const CartItemCard = ({img,id, name, price, oldPrice, qty, seller, removeItem, removeFromCart, addToCart}:Props) => {
  const router = useRouter()

  return (
    <div className='border-b border-borderColor pb-4 mb-4'>
      <div className='flex flex-col sm:flex-row justify-between gap-4 cursor-pointer' onClick={() => router.push(`/products/${id}`)}>
        <div className='flex gap-2'>
          <Image src={img} alt={name} width={100} height={100} className=''
            loading="lazy" placeholder="blur" blurDataURL="data:image/png;base64,..."
          />
          <div>
            <h3 className='text-md font-medium mb-2'>{name}</h3>
            <p><span className='text-[#75757a]'>Seller: </span>{seller}</p>
            <p className='text-secondary-normal text-sm font-light'>Few units left</p>
          </div>
        </div>
        <div className='sm:text-right'>
          <p className='text-lg font-medium'>{formatToNairaCurrency(price)}</p>
          <p className='text-[#75757a] text-sm line-through'>{formatToNairaCurrency(oldPrice)}</p>
        </div>
      </div>
      <div className='flex justify-between gap-4 mt-2'>
        <button onClick={()=>removeItem(id)} className='text-secondary-normal hover:text-secondary-light'>
          <Trash2 className='inline' /> REMOVE
        </button>
        <div className='flex items-center gap-x-4'>
          <button className='bg-secondary-normal text-white rounded-md px-3 py-1'
            onClick={() => {
              if(qty === 1) {
                removeFromCart(id)
              }else if (qty > 1) {
                removeFromCart(id)
              }
            }}
          >
            -
          </button>
          <p>{qty}</p>
          <button className='bg-secondary-normal text-white rounded-md px-3 py-1' 
            onClick={() => {
              addToCart(id)
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItemCard