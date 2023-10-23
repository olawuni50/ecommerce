import React from 'react'
// import {ShopProps} from '../types'
import Image from 'next/image'
import Link from 'next/link'
import {Button} from '@/components'
import {NextPage} from 'next'


// interface ShopCardProps {
//     shop: ShopProps
// }

const ShopCard: NextPage = ({shop}:any) =>{

    const {name, price, slug, images, description, category, discountPercent,} = shop

      const discount = price * (discountPercent)/100
      const discountedPrice = price - discount


    return(
        <div>
        <Link href={`/shopping/${slug.current}`} >
          <div>

                <div className="aspect-h-1 aspect-w-1 w-full  rounded-lg overflow-hidden
                bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 hover:-translate-y-0.5 hover:scale-109 duration-100">

                  <div className="relative overflow-hidden">

                <img src={images[0].url} alt={name} className="h-64 w-full object-cover object-center group-hover:opacity-75"/>
                

                <div className="absolute top-0 right-0  text-purple-900  overflow-hidden">
                  {
                    discountPercent >= 1 ? (
                      <p className="italic bg-white rounded-bl-lg  p-1">-{discountPercent}%</p>
                    ):(
                      <p></p>
                    )

                  } 
                
                </div>

                </div>

                </div>           

              <div className="flex justify-between mt-4">

              <h3 className="text-sm text-gray-700">{name}</h3>

              { discountPercent >= 1 ? (
                
                <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">${discountedPrice}</p>
                <p className="text-sm font-medium text-gray-400 line-through ">${price}</p>
                </div>
              ):(

                <p className="text-sm font-medium text-gray-900">${price}</p>

              )

              }
              
              </div>

              <h3 className="mt-4 text-sm text-gray-400 italic mb-3">{category.name}</h3>              
              
              </div>          
        </Link>
        <Button text="Add to Cart" containerStyles="text-white w-full hover:bg-purple-800"/>
        </div>

    )
}

export default ShopCard