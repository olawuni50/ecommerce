// "use client"

import ShopDetailServer from "@/Components/ShopDetails/ShopDetailServer"
import ShopDetailsClient from "@/Components/ShopDetails/ShopDetailsClient"


const ShopDetails = async (props: {params: {slug:string}}) => {
  const {params:{slug}} = props

 
  
  return(
    <div>
      <ShopDetailsClient slug={slug} >
        <ShopDetailServer slug={slug} /> 
      </ShopDetailsClient>
      
    </div>
  )
}


export default ShopDetails