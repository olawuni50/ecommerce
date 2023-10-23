import {Category, Shop, ShopSubset} from '@/models/shop'
import client from "@/libs/client"
import axios from 'axios';
// import {Shop} from '@/models/shop'


export const getCategories = async (): Promise<Category[]> => {
    const query = `*[_type == "category"] {
        
        name,
        slug {current},
        image,
        subtitle
    }`;

    const categories: Category[] = await client.fetch({query})

    return categories;      
}

// getShop and getTrendingShop have the same logic, just the number of post
export const getShop = async (): Promise<Shop[]> => {
    const query = `*[_type == "shop" ] | order(_createdAt desc)[0...5]{
    
        name,
        price,
        images,
        discountPercent,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0]{
            name,
            slug {
                current,
            }
        },
        slug,
        quantity,
        description
    }`;

    const shops: Shop[] = await client.fetch({query})

    return shops;      
}

// limited number of trending games
export const getTrendingShop = async (): Promise<Shop[]> => {
    const query = `*[_type == "shop" ] | order(_createdAt desc)[0...5] {
    
        name,
        price,
        discountPercent,
        images,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0]{
            name,
            slug {
                current,
            }
        },
        slug,
        quantity,
        description
    }`;

    const trending: Shop[] = await client.fetch({query})

    return trending;      
}


export const getShopDetails = async (slug:string): Promise<Shop> => {
    const query = `*[_type == "shop" && slug.current == "${slug}" ][0]{
        _id,
        name,
        price,
        discountPercent,
        images,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0]{
            name,
            slug {
                current,
            }
        },
        slug,
        quantity,
        description

    }`;

    const shop: Shop = await client.fetch({query})

    return shop;      
}



// GET collection of all products under each category
export const getCategoryProducts = async (slug:string): Promise<Shop[]> => {
    const query = `*[_type == "shop" && category->slug.current == "${slug}" ] {
        
        name,
        images,
        price,
        discountPercent,
        isFeatured,
        isTrending,
        slug,
        quantity,
        description,
        category->{
            name,
            subtitle
        }
    }`;

    const shops: Shop[] = await client.fetch({query})

    return shops      
}

// only one property of category (subtitle)
export const getCategory = async (slug:string): Promise<Category> => {
    const query = `*[_type == "category" && slug.current == "${slug}" ][0]`;

    const category: Category = await client.fetch({query})

    return category;      
}

// update quantity in sanity
export const updateShopQuantity = async (shops: ShopSubset[])=>{
    
    const mutation = {
        mutations: shops.map(({_id, maxQuantity, quantity}) => {
            return{
                patch: {
                    id: _id,
                    set: {
                        quantity: maxQuantity - quantity,
                    }
                }
            }
        })

    }

    

    const {data} = await axios.post(`https://${process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET}`,
     mutation, {headers: {Authorization: `Bearer ${process.env.SANITY_TOKEN}`}}
    );

    return data

}

// create order in sanity
export const createOrder = async (shops: ShopSubset[], userEmail:string)=>{
    
   const mutation = {
    mutations: [
        {
            create: {
                _type: 'order',                
                items: shops.map((shop, idx) =>({
                    shop:{
                        _key: idx,
                        _type:'reference',
                        _ref: shop._id,
                    },
                    quantity: shop.quantity
                })),     
                userEmail,           
                orderStatus: 'pending'                
            }
        }
    ]
   }

    

    const {data} = await axios.post(`https://${process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET}`,
     mutation, {headers: {Authorization: `Bearer ${process.env.SANITY_TOKEN}`}}
    );

    return data

}

// get order from sanity to next js
export async function getOrder(userEmail:string){

    const query = `*[_type == 'order' && userEmail == $userEmail ]{
        _id,
        items[] {
            _key,
            quantity,
            shop -> {
                _id,
                name,
                price,
                images,
                slug {
                    current
                },
                description
            }

        },
        orderStatus,
        createdAt
    }`;

    const params = {userEmail};
    const result: any = await client.fetch({query, params});

    return result
}


// search params
export const searchQuery = (searchTerm: string | string[]) =>{
    const query = `*[_type == "shop" && name match '${searchTerm}*' || category match '${searchTerm}*' ]{
        _id,
        name,
        price,
        images,
        discountPercent,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0]{
            name,
            slug {
                current,
            }
        },
        slug,
        quantity,
        description

    }`
    return query;
}




