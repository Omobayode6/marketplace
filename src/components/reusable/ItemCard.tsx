import Image from 'next/image';
import React from 'react'
import { formatToNairaCurrency } from './formartCurrency';

type Props = {
  img: string;
  name: string;
  price: number;
  oldPrice?: number;
  category?: string;
  seller?:string;
}

const ItemCard = ({img, name, price, oldPrice, category, seller}:Props) => {
  return (
    <div className='bg-white hover:shadow-custom hover:rounded-md overflow-hidden cursor-pointer'>
      <Image src={img} alt={name} width={300} height={300} loading="lazy"
        className=''
      />
      <div className='px-2 pt-2 pb-4'>
        <h3 className='text-md'>{name}</h3>
        <p className='font-semibold'>{formatToNairaCurrency(price)}</p>
        <p className='text-[#75757a] text-sm line-through'>{formatToNairaCurrency(oldPrice)}</p>
      </div>
      
    </div>
  )
}

export default ItemCard