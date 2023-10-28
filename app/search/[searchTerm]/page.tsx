// import { ShopCard, HeroSection } from "@/components";
import HeroSection from "@/Components/HeroSection";
import ShopCard from "@/Components/ShopCard";
import { getShop } from "@/libs/api";



export default async function Page(){
    
    const shops = await getShop();
    
  

    return(
        <div>

            <HeroSection showLink />
            <div className="home__card bg-white p-4 shadow-lg rounded">
     
     {shops.length ? (
        shops.map((shop) =>(
            <ShopCard shop={shop} key={shop._id} />
        ))
     ): (
        <div>No Info</div>
     )}
     

     </div> 
        </div>
    )
}