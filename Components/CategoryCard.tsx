import React from "react"
import {CategoryProps} from '../types'
import Image from 'next/image'
import Link from 'next/link'


const CategoryCard = ({category}:any) =>{
    const {name, slug, image, subtitle} = category

    return(
        <section className="max-container ml-2 hover:-translate-y-0.5 
        hover:scale-109 duration-100">

            
        <Link href={`/categories/${slug.current}`}>
            <div>        
                        
            
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">

            <img src={image} alt={name} className="h-96 w-full object-cover 
            object-center opacity-90" />

            <div className="absolute bottom-0 left-0 text-white p-2">

            <div className="text-md font-bold">{name} </div>
            <p>{subtitle} </p>
            <button className="bg-white text-black rounded p-1
            hover:bg-gray-100 mt-2">Shop Now</button>
            </div>
            </div>
            
            </div>

        </Link>
        </section>
    )
}

export default CategoryCard

