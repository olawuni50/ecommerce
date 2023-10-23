import { Shop } from '@/models/shop';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// get our cart info in local storage: the name "cart" will be the name in our local storage
const cartFromLocalStorage = typeof localStorage !== "undefined" && localStorage.getItem("cart") 
? JSON.parse(localStorage.getItem('cart')!)
: [];

interface CartState{
    showCart: boolean;
    cartItems: Shop[]
}

const initialState: CartState = {
    showCart: false,
    cartItems: cartFromLocalStorage,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleCart(state) {
            // if it is true show cart if not dont show
            state.showCart = !state.showCart;
        },

        addItemToCart: (state, action: PayloadAction<Shop>) => {
            const newItem = action.payload;
            // check if we have an existing item
            const existingItem = state.cartItems.find(item =>item._id === newItem._id)

            if(existingItem) {
                existingItem.quantity = newItem.quantity
            } else {
                state.cartItems.push(newItem)
            }
            // saving data to storage
            localStorage.setItem('cart', JSON.stringify(state.cartItems))         
        }, 

        removeItemFromCart: (state, action:PayloadAction<{ _id: string}>) => {
            const itemId = action.payload._id
            const updatedState = state.cartItems.filter((item) => item._id !== itemId)
            // we deleate what we have in store and update our state
            state.cartItems.splice(0, state.cartItems.length, ...updatedState)

            // saving data in storage
            localStorage.setItem('cart', JSON.stringify(state.cartItems))  

        }

    }
})

export const {toggleCart, addItemToCart, removeItemFromCart} = cartSlice.actions;

export default cartSlice.reducer