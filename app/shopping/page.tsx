import {HeroSection, ShopCard} from '@/components'
import { getShop } from '@/libs/api'


export default async function Page() {
  const shops = await getShop()

    return <>
    {/* <HeroSection /> */}
    <div className="hero">

      <h1 className="heading">Check out our latest collections</h1>

      <div className="home__card">
            {shops?.map((shop) =>(
              <ShopCard shop={shop} key={shop._id} />
            ))}           

            </div> 

    
    </div>
    </>
  }