import Image from 'next/image'

// import {HeroSection, ShopCard, CategoryCard, Button} from '@/components'

import Link from 'next/link'
import { getCategories, getShop, getTrendingShop } from '@/libs/api'
import {Shop} from '@/models/shop'
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import ShopCard from '@/components/ShopCard';
import Button from '@/Components/Button';



export default async function Home() {

  const categories = await getCategories();
  const shops = await getShop();
  console.log(shops)
  const trends = await getTrendingShop();
  const isTrending = trends?.filter(trend => trend.isTrending)
  const isFeatured = shops?.find(shop=>shop.isFeatured)

  

  return (
    <main>

        <section className="pt-24">
        <HeroSection showLink />
        </section>


        {/* Categories */}
              <section className="max-container">
        <h1 className="heading">Shop by Category</h1>
          <div>
          {/* <Image src="/fp2.jpg" alt="category-image" width={200} height={200} className="object-contain" /> */}

          <div  className="mt-6 space-y-12 lg:grid lg:grid-cols-5 
          lg:gap-x-6 lg:space-y-0 bg-white p-4 shadow-lg rounded">
            {categories?.map((category) =>(
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
          </div>
          </section>



           {/* Recent Products */}
        <section id="recent-products" className="max-container mt-10">
        <h1 className="heading">Our Recent Products</h1>

        <div className="home__card bg-white p-4 shadow-lg rounded">
     
            {shops?.map((shop) =>(
              <ShopCard shop={shop} key={shop._id} />
            ))}           

            </div> 
           
          </section>

           <div className="mt-10">
          <Link href="shopping">
            <Button text="See All" containerStyles="mx-auto max-w-xl w-40 hover:bg-purple-700
            hover:-translate-y-0.5 hover:scale-109 duration-100"/>
          </Link>      
           </div>



          {/* Featured Products */}
          {isFeatured && (
          <>
        <section className="max-container">
        <h1 className="heading">Featured Product</h1>

            <div className="home__card mb-10 gap-5">
          <h2 className="text-3xl font-bold text-bold">{isFeatured.name}</h2>
          <p className="tex-xl font-semibold leading-normal">{isFeatured.description}</p>
          <Link href={`/shopping/${isFeatured.slug.current}`}>
            <Image src={isFeatured.images[0].url} alt={isFeatured.name}
            width={500} height={500} className="rounded-full" />
          
          </Link>
          </div>
        </section>          
          </>)}
                


      {/* Trending Product */}
        <section className="max-container">
        <div>
        <h1 className="heading">Trending Products</h1>

          <div  className="home__card bg-white p-4 shadow-lg rounded">
            {isTrending?.map((shop) =>(
              <ShopCard shop={shop} key={shop._id} />
            ))}            

            </div>
        </div>
        </section>          
        
            </main>
  )
}
