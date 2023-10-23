import { createOrder, updateShopQuantity } from "@/libs/api";
import client from "@/libs/client";
import { Shop, ShopSubset } from "@/models/shop";
import { NextResponse } from "next/server";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16'
})


export async function POST(req: Request, res: Response) {
    const {cartItems, userEmail} = (await req.json());

    const origin = req.headers.get('origin')

    const updatedItems: ShopSubset[] = (await fetchAndCalculateItemPricesAndQuantity(cartItems)) as ShopSubset[];

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: updatedItems.map(item => ({
                quantity: item.quantity,
                adjustable_quantity: {
                    enabled: true,
                    maximum: item.maxQuantity,
                    minimum: 1,
                }, 
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.name,
                        images: [item.images[0].url],
                    },
                    unit_amount: parseInt((item.price * 100).toString()),
                }
            })),
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            mode:'payment',
            success_url:`${origin}/?success=true`,
            phone_number_collection: {enabled: true},
        });

        // Updating quantity in sanity
         await updateShopQuantity(updatedItems)

        //  creating an order in sanity
       await createOrder(updatedItems, userEmail)

        return NextResponse.json(session, {status:200, statusText:'payment successful'})

    } catch (error: any) {
        console.log("ERROR", error);
        return new NextResponse(error, {status:500})
        
    }
}

async function fetchAndCalculateItemPricesAndQuantity(cartItems: Shop[]){
    const query = `*[_type == "shop" && _id in $itemIds] {
        _id,
        name,
        price,
        quantity,
        images
    }`
    try {
        // Fetch items from sanity based on shop IDs
        const itemIds = cartItems.map(item => item._id);
        const sanityItems: ShopSubset[] = await client.fetch({query, params:{itemIds}})

        const updatedItems: ShopSubset[]= sanityItems.map(item => ({
            ...item, maxQuantity: item.quantity
        }))

        // Check the quantity
        if(checkQuantitiesAgainstSanity(cartItems, updatedItems)){
            return new NextResponse
            ('Quantity has been updated, please update your cart', {status:500})
        }
        // Calculate prices
        const calculatedItemPrices: ShopSubset[] = updatedItems.map(item => {
            const cartItem = cartItems.find(cartItem => cartItem._id === item._id);
            return {
                _id: item._id,
                name: item.name,
                images: item.images,
                // cartItem.quantity is the quantity from local storage
                quantity: cartItem?.quantity as number,
                // item.quantity, is the quantity from sanity studio
                maxQuantity: item.quantity,
                price: item.price
            };
        })

        return calculatedItemPrices
    } catch (error) {
        return new NextResponse
            ('Quantity has been updated, please update your cart', {status:500})
        
    }
}

function checkQuantitiesAgainstSanity(cartItems: Shop[], sanityItems:ShopSubset[]) {
    for(let i=0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const sanityItem = sanityItems[i];

        if(cartItem.quantity <= sanityItem.quantity) {
            return false;
        }
    }

    return true;
}