import { getShopDetails } from "@/libs/api";


const ShopDetailServer = async (props: {slug:string}) =>{
    const {slug} = props


    const getDetails = await getShopDetails(slug); 

    const {name, price, description, discountPercent, quantity} = getDetails

    const discount = price * (discountPercent)/100
      const discountedPrice = price - discount

    return(
        <div className="divide-y">

                    <div>
                    <h2 className="hero__title">{name}</h2>
                    <h2 className="text-md text-slate-500 w-3/4 max-sm:w-full leading-normal mb-3">{description}</h2>

                    </div>

                    <div>
                        
            {
                discountPercent >= 1 ? (
                    <h2>${discountedPrice}</h2>
                ):(
                    <p className="text-2xl font-bold">${price}</p>
                )}
                 {/* <div className="text-gray-400">Qty: {quantity}</div> */}
                    </div>         
                    </div>
    )
}

export default ShopDetailServer