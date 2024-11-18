import { createSlice } from "@reduxjs/toolkit";

let obj  = {
    cartItems :[]
}


 let slice =    createSlice({
    name:"cart",
    initialState : obj,
    reducers :{
        addToCart : (state,action)=>{
            state.cartItems.push(action.payload)
        },
        deleteFromCart : (state,action) => {
            state.cartItems.splice(action.payload,1)
           
        },
        removeCart :(state) =>{
            state.cartItems = []
            
        }
    }
    
})
export const {addToCart,deleteFromCart,removeCart} = slice.actions
export default slice.reducer