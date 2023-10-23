export interface Category {
    _id: string;
    name: string;
    slug: {current: string};
    image: string;
    subtitle: string;
}

export interface Shop {
    _id: string;
    name: string;
    price: number;
    discountPercent: number;
    slug: {current: string};
    images: Array<{
        _key: string;
        url: string;
    }>;
    isFeatured: boolean;
    isTrending: boolean;
    category: {
        name: string;
        slug: {current:string}
    };
    quantity: number;
    description: string;
}

// for stripe
export type ShopSubset = Pick<Shop, "_id" | "price" | "quantity" | "name" | "images"> 
& {maxQuantity: number}

