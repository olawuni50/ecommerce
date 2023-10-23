"use client"
import {useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/storeHook'
import { toggleCart, removeItemFromCart } from '@/redux/features/cartSlice';
import {Button} from '@/components'
import {BsCartX} from "react-icons/bs"
import { Fragment, useState } from 'react'
import axios from 'axios'
import useCartTotal from '@/hooks/useCartTotal';
import { getStripe } from '@/libs/loadStripe';
import {toast} from 'react-hot-toast'
import { useSession } from 'next-auth/react';
import Link from 'next/link'


const Cart:any = () => {

    const [open, setOpen] = useState(true);
    const [renderComponent, setRenderComponent] = useState(false)
    const [loading, setLoading] = useState(false)

    const {showCart, cartItems} = useAppSelector((state) => state.cart)

    const {totalPrice} = useCartTotal()

    const dispatch = useAppDispatch();

    const {data: session} = useSession()

    const handleRemove = (id: string) =>{
        dispatch(removeItemFromCart({_id: id}));
    }

    useEffect(() => {
        setRenderComponent(true);
    }, [])

    if (!renderComponent) return <></>

    const checkOutHandler = async () => {
      const stripe = await getStripe();

      const {data} = await axios.post('/api/stripe', {cartItems, userEmail:session?.user?.email});
      setLoading(true)
      if(data) toast.success(`${data.statusText}`)

      if(!data) return;
      localStorage.removeItem('cart');

      stripe.redirectToCheckout({sessionId: data.id})
      
    }

    // const calculateCartTotal = (): {totalPrice:number, totalQuantity:number} =>{
    //         let totalPrice = 0;
    //         let totalQuantity = 0;

    //         cartItems.forEach(item => {
    //             totalPrice += Number((item.price * item.quantity).toFixed(2));
    //             totalQuantity += item.quantity;
    //         })        
    //     return {totalPrice, totalQuantity};
    // }
    // const {totalPrice, totalQuantity} = calculateCartTotal();



  return (
   
    <div
			className={`${classNames.container} ${
				showCart ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div className={classNames.header}>
				<h2 className={classNames.title}>Shopping Cart</h2>
				<button
					className={classNames.closeBtn}
					onClick={() => dispatch(toggleCart())}
				>
					X
				</button>
			</div>

      <ul role="list" className="-my-6 divide-y divide-gray-200 p-2">

                       { cartItems && cartItems.length > 0 ? (

                            cartItems.map((item) => (
                                <li key={item._id} className="flex py-6">
                                 <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.images[0].url}
                                      alt={item.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
  
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <p>{item.name}</p>
                                        </h3>
                                        <p className="ml-4">{item.quantity}</p>
                                      </div>
                                      {/* <p className="mt-1 text-sm text-gray-500">{item.color}</p> */}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">${item.price} </p>
  
                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() =>handleRemove(item._id)}
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))

                        ):(
                            <div className="flex justify-center flex-col items-center mt-20">
                                 <BsCartX className="rounded-full w-24 h-24" />
                                <p className="font-bold mt-5">Your cart is empty</p>
                                <p className="mt-5 text-center">Browse our categories and discover our best deals!</p>
 
                                <div className="mb-10 mt-5">

                                  <Link href="/">
                                <Button text="Start Shopping" />
                                  </Link>

                                </div>
                                </div>
                        )
                        
                        }
                      </ul>

					<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                      </div>
                      <p className="mt-0.5 text-sm  text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button onClick={checkOutHandler}  className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          {loading ? "Processing..." : "Checkout"}
                        
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          {/* or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button> */}
                        </p>
                      </div>
                    </div>
                  </div>
		
   
  )
}

  const classNames = {
 	container:
 		'fixed top-0 right-0 z-50 h-screen w-45 md:w-96 p-2 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
 	header: 'px-4 py-2 bg-gray-200 flex items-center justify-between',
 	title: 'text-lg font-semibold',
 	closeBtn: 'text-gray-600 hover:text-gray-800',
 	itemContainer: 'p-4 flex flex-col items-center border-b',
 	subtotalContainer: 'px-4 py-2 bg-gray-200 flex items-center justify-between',
 	subtotalText: 'text-gray-600',
 	subtotalPrice: 'font-semibold',
 	checkoutBtn:
 		'w-full py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600',
 };

 const cartItemClassNames = {
 	container: 'flex items-center py-2 border-b',
 	image: 'w-12 h-12 object-cover mr-4',
 	details: 'flex-1',
 	name: 'text-sm md:text-base font-medium',
 	price: 'text-gray-600',
 	quantityContainer: 'flex items-center',
 	quantity: 'px-2',
 	removeButton:
 		'w-6 h-6 bg-gray-200 text-gray-600 flex items-center justify-center rounded ml-2',
 }

export default Cart