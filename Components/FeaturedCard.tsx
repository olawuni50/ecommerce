import React from 'react'
import {FeaturedProps} from '../types'
import Image from 'next/image'
import Link from 'next/link'



interface FeaturedCardProps{
    featureProduct: FeaturedProps
}

const FeaturedCard = ({featureProduct}: FeaturedCardProps) =>{
    const {name, description, slug, image} = featureProduct
    return(
        <div className='mb-5 mt-5'>
            <div className="text-xl font-bold">{name}</div>
            <div className="text-xl">{description} </div>

            <Link href={`/shopping/${slug}`}>

        <Image src="/6.png" alt="featured Image" width={500} height={500} className="object-contain" />
            </Link>
        
        </div> 

    )
}

export default FeaturedCard