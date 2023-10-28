import React from 'react'
// import {Button} from '@/Components'
import Image from 'next/image'
import {HeroProps} from '../types';
import Link from 'next/link'
import Button from './Button';


interface HeroCardProps{
  showLink:HeroProps
}

const HeroSection = async ({showLink}:HeroCardProps) => {

  return (
    <div className="hero">
    
    
      <div>
        <p className="capitalize text-coral-red text-md font-montserrat">our summer collection</p>
        <h1 className="capitalize lg:text-8xl md:text-4xl text-3xl w-full font-palanquin font-bold mt-5
        ">The new arrival <br/>
        <span className="text-coral-red">nikee </span> shoes</h1>

        <div className="mt-10">

        {showLink && (
          <Link href="#recent-products">
        <Button text="Shop Now" />
        </Link>
        )}
        </div>
        
        </div>  

        <div>
        <Image src="/fp.png" alt="Fashion Items" width={400}
      height={400} className="object-contain mt-10" />
          
          </div>  

      


    </div>
  )
}

export default HeroSection