"use client"
import React, {useState, useEffect} from 'react'
import {getShopDetails} from '@/libs/api'
import {Button} from '@/components'
import { Shop } from '@/models/shop'
import { useAppDispatch } from '@/hooks/storeHook'
import {addItemToCart } from '@/redux/features/cartSlice'

const ShopDetailsClient = (props: {slug:string; children: React.ReactNode}) => {
  const {slug, children} = props

  const [quantity, setQuantity] = useState(0) 
  const [price, setPrice] = useState(0);
  const [getDetails, setGetDetails] = useState<Shop>();

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchShopDetails = async () => {
      const shops = await getShopDetails(slug);
      setGetDetails(shops)
    }
    fetchShopDetails()

  }, [slug])

 

  const handleDecrease = () =>{
    if(!getDetails) return
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setPrice(Number(((quantity-1) * getDetails.price).toFixed(2)))
    }
  }

  const handleIncrease = () =>{
    if(!getDetails) return
    if (quantity < getDetails.quantity) {
      setQuantity(quantity + 1);
      setPrice(Number(((quantity+1) * getDetails.price).toFixed(2)))
    }
  }

  const handleAddToCart = () =>{
    if(!getDetails) return;
    dispatch(addItemToCart({...getDetails, quantity}))
  }

  
  return(
    <section className="max-container gap-5 p-10 max-sm:flex-col flex justify-between items-center">

      <div>
      <img src={getDetails?.images[0].url} alt={getDetails?.name} className="h-full w-64 rounded object-cover object-center group-hover:opacity-75 shadow-md"/>
      </div>
      
      <div className="divide-y">
          {/* Render Shop Details Server (coming from ShopDetailServer)*/}
      {children}


      <div className="mt-4 py-3">

      <button onClick={handleDecrease} className="detail__button mr-2 hover:-translate-y-0.5 
      hover:scale-109 duration-100">-</button>
      

      <input type="text" value={quantity} className="outline-none p-1 rounded-md shadow-md w-auto" readOnly/>

      <button onClick={handleIncrease} className="detail__button ml-2 hover:-translate-y-0.5 
      hover:scale-109 duration-100">+</button>

      <p className="text-xl font-bold mt-3">${price}</p>

      </div>
      
      <div className="mt-6 py-3 max-sm:ml-10">

        {quantity <= 0 ? (
          // <Button text="Add to Cart" disabled/>
          <button className="bg-red-900 p-2 rounded text-[#ffff] opacity-25" disabled>Add to Cart</button>

        ):(
          <Button text="Add to Cart" handleClick ={handleAddToCart}/>
        )}

      </div>

    

      </div>

      
    </section>
  )
}


export default ShopDetailsClient