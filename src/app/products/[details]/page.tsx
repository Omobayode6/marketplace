'use client'
import useStore from '@/store'
import { ShoppingCart } from 'lucide-react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { ProductProps, products } from '../page'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatToNairaCurrency } from '@/components/reusable/formartCurrency'
import EmptyState from '@/components/reusable/EmptyState'


const ProductDetail = ({params}:any) => {
  const productId = params?.details
  const [isAdd, setIsAdd] = useState(false)
  const [count, setCount] = useState(0)
  const {cartItems, setCartItems} = useStore()
  const product = products.find((product:ProductProps) => product?.id === productId);
  const imageUrl = product?.img ?? '/no-image.png';
  const cartproduct = cartItems.find((product:ProductProps) => product?.id === productId);
  console.log(cartproduct)

  // Add item to cart
  const addToCart = (item?: ProductProps) => {
    if (!item) {
      console.error("Cannot add an undefined product");
      return;
    }
    const existingItem:any = cartItems.find((cartItem:ProductProps) => cartItem?.id === item?.id);
    const nonExistItems:any  = cartItems.filter((cartItem:ProductProps) => cartItem?.id !== item?.id);
    if (existingItem) {
      const newCartItems = [...nonExistItems, {...existingItem, qty: existingItem?.qty + 1, totalPrice: existingItem?.totalPrice + item?.price}];
      setCartItems(newCartItems)
      // toast.success("extra quantity added");
    } else {
      const newCartItems = [...cartItems, {...item, qty: 1}];
      setCartItems(newCartItems)
      toast.success("Item added to cart");
    }
  };

  // Remove item from cart
  const removeFromCart = (item?: ProductProps) => {
    if (!item) {
      console.error("Cannot remove an undefined product");
      return;
    }
    const existingItem:any = cartItems.find((cartItem:any) => cartItem?.id === item?.id);
    const nonExistItems:any  = cartItems.filter((cartItem:any) => cartItem?.id !== item?.id);
    if (existingItem?.qty > 1) {
      const newCartItems = [...nonExistItems, {...existingItem, qty: existingItem?.qty - 1, totalPrice: existingItem?.totalPrice - item?.price}];
      setCartItems(newCartItems)
    } else {
      const newCartItems = cartItems?.filter((cartItem:any) => cartItem.id !== item.id)
      setCartItems(newCartItems)
      toast.success("Item removed from cart");
    }
  };

  return (
    <main>
      <section className='flex gap-4 bg-white md:w-[70%] rounded-sm my-[30px] px-4 py-4 mx-[2%] md:mx-[4%]'>
        <div className=''>
          <Image src={imageUrl} alt={product?.name as string} width={300} height={300} loading="lazy"/>
        </div>
        <div className='flex flex-col justify-between w-[70%]'>
          {product ? (
            <>
              <div>
                <p className='bg-primary-normal text-white p-1 mb-4 w-fit'>Official Store</p>
                <h3 className='text-xl tracking-wider mb-2'>{product?.name}</h3>
                <h2 className=''>{formatToNairaCurrency(product?.price)}</h2>
                <p className='text-[#75757a] text-sm line-through'>{formatToNairaCurrency(product?.oldPrice)}</p>
              </div>
              {
                (isAdd || cartproduct?.qty as number > 0) ? (
                  <div className='flex items-center gap-3 h-fit'>
                    <button className='bg-secondary-normal text-white rounded-md px-3 py-1'
                      onClick={() => {
                        if(cartproduct?.qty === 1) {
                          removeFromCart(product)
                          setCount((prev)=>prev-1)
                        }else if (cartproduct?.qty as number > 1) {
                          removeFromCart(product)
                          setCount((prev)=>prev-1)
                        }
                      }}
                    >
                      -
                    </button>
                    <p>{cartproduct?.qty}</p>
                    <button className='bg-secondary-normal text-white rounded-md px-3 py-1' 
                      onClick={() => {
                        addToCart(product)
                        setCount((prev)=>prev+1)
                      }}
                    >
                      +
                    </button>
                    <p className='text-sm hidden sm:block'>(<span className='font-medium'>{cartproduct?.qty}</span> irem(s) added)</p>
                  </div> 
                ) : (
                <button className='flex justify-center gap-4 bg-secondary-normal text-white hover:bg-secondary-light w-full px-3 py-2 rounded-sm'
                  onClick={()=>{
                    setIsAdd(true)
                    addToCart(product)
                    setCount((prev)=>prev+1)
                }}>
                  <ShoppingCart /> <span className='hidden md:block'>Add To Cart</span>
                </button>
                )
              }
            </>
          ) : (
            <EmptyState
              title={`No Product`}
              text={`Oops! It seems something went wrong.`}
            />
          )}
            
        </div>
      </section>
    </main>
  )
}

export default ProductDetail