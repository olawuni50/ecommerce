export interface ButtonProps{
    text: string;
    btnType?: "button" | "submit";
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    textStyles?: string;
}

export interface HeroProps {
    showLink: boolean
}

export interface ShopProps{
    image:string,
    price: number,
    slug: string,
    name:string,
    description: string,
    id:number
}

export interface FeaturedProps{
    name:string,
    description: string,
    image: string,
    slug: string
}

export interface CategoryProps{
    name: string,
    slug: {current: string},
    image: string,
    _id: number,
    subtitle: string
}