
import ShopCard from '@/components/ShopCard';
import {getCategoryProducts, getCategory} from '@/libs/api'
// import {ShopCard} from '@/components';
import Link from 'next/link'


// [slug] always have params and searchParams
const ShopCategory= async (props:{params: {slug: string}} ) =>{
    const {params: {slug},} = props

    const shops = await getCategoryProducts(slug);
    const category= await getCategory(slug)
    console.log(shops)

    return(
        <div className="hero">

            <div><Link href="/" className="hover:underline">
                Home
                </Link> &gt; Category &gt; {slug}</div>

            <div className="flex justify-center text-xl font-bold mt-3 
            bg-white shadow p-3">{slug.toUpperCase()}</div>

            <div className="text-xl mt-3 bg-teal-300 p-3"> {category.subtitle}</div>

            <p className="py-4 text-md font-bold">Check out our latest collection of {slug} </p>
            
       

            {/* collection of all products under each categories */}
            <div className="home__card bg-white p-4 shadow-lg rounded">
     
            {shops?.map((shop) =>(
              <ShopCard shop={shop} key={shop._id} />
            ))}           

            </div> 
            </div>
    )
}

export default ShopCategory