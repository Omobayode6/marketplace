'use client'
import CartItemCard from '@/components/reusable/CartItemCard'
import useStore from '@/store'
import React from 'react'
import { toast } from 'react-toastify'
import { ProductProps, products } from '../products/page'
import EmptyState from '@/components/reusable/EmptyState'
import { formatToNairaCurrency } from '@/components/reusable/formartCurrency'
import { useRouter } from 'next/navigation'


const CartPage = () => {
  const {cartItems, setCartItems} = useStore()
  const router = useRouter()
  const totalQty = cartItems?.reduce((sum:number, product:ProductProps) => sum + product?.qty, 0);
  const totalPrice = cartItems?.reduce((sum:number, product:ProductProps) => sum + product?.totalPrice, 0);

  // Add quantity to cart item
  const addToCart = (id: string) => {
    const updatedCartItems = cartItems.map((cartItem:any) => {
      if (cartItem?.id === id) {
        return {
          ...cartItem,
          qty: cartItem?.qty + 1,
          totalPrice: cartItem?.totalPrice + cartItem?.price 
        };
      }
      return cartItem;
    });
  
    setCartItems(updatedCartItems);
  };

  // Remove quantity from cart item
  const removeFromCart = (id: string) => {
    const updatedCartItems = cartItems.map((cartItem:any) => {
      if (cartItem.id === id && cartItem.qty > 1) {
        return {
          ...cartItem,
          qty: cartItem.qty - 1,
          totalPrice: cartItem.totalPrice - cartItem.price
        };
      }
      return cartItem;
    }).filter((cartItem:any) => cartItem.qty > 0);

    setCartItems(updatedCartItems);
  };

  //remove item from cart
  const removeItem = (id: string) => {
    const newCartItems = cartItems?.filter((cartItem:any) => cartItem.id !== id)
    setCartItems(newCartItems)
    toast.success("Item removed from cart");
  }
  
  return (
    <main className='flex flex-col md:flex-row justify-between gap-4 my-[30px] mx-[2%] md:mx-[4%]'>
      <section className='md:w-[70%] bg-white rounded-md px-4 py-4'>
        <h3 className='text-lg font-medium border-b border-borderColor pb-2 mb-4'>Cart ({cartItems?.length})</h3>
        {cartItems?.length > 0 ? (
          <>
          {cartItems?.map((cartItem:ProductProps, key:number) => (
            <div key={key}>
              <CartItemCard
                id={cartItem?.id}
                img={cartItem?.img}
                name={cartItem?.name}
                price={cartItem?.price}
                oldPrice={cartItem?.oldPrice}
                qty={cartItem?.qty}
                seller={cartItem?.seller}
                addToCart={addToCart}
                removeItem={removeItem}
                removeFromCart={removeFromCart}
              />
            </div>
          ))}
          </>
        ) : (
          <EmptyState
            title={`No Item in Cart`}
            text={`Oops! There is no item in your cart`}
          />
        )}
      </section>
      <div className='md:w-[30%] bg-white rounded-md h-fit px-4 py-4'>
        <h3 className='text-lg border-b border-borderColor pb-3 mb-3'>CART SUMMARY</h3>
        {cartItems?.length > 0 ? (
          <>
            <div className='flex justify-between gap-x-4 border-b border-borderColor pb-3 mb-3'>
              <p className='text-[##4d4c4c]'>Item&apos;s total ({totalQty})</p>
              <p className='text-right text-[#4d4c4c] font-medium tracking-wider'>{formatToNairaCurrency(totalPrice)}</p>
            </div>
            <div className='border-b border-borderColor pb-3 mb-3'>
              <div className='flex justify-between gap-x-4 '>
                <p className='font-semibold'>Subtotal</p>
                <p className='text-right font-semibold tracking-wider'>{formatToNairaCurrency(totalPrice)}</p>
              </div>
              <p className='text-[#75757a] text-xs'>Delivery fees not included yet.</p>
            </div>
            <button className='text-white bg-secondary-normal hover:bg-secondary-light w-full rounded-[8px] px-4 py-2'
              onClick={()=> {
                setCartItems([])
                toast.success('Checkout Successfully')
                router.push('/products')
              }}
            > 
              CHECKOUT ({formatToNairaCurrency(30)})
            </button>
          </>
          ) : (
            <EmptyState
              title={`No Summary`}
              text={`Oops! There is no summary`}
            />
          )}
      </div>
    </main>
  )
}

export default CartPage