import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    productdata: [],
    minPrice: 5,
    maxPrice: 5,
}
export const getProducts = createAsyncThunk('products/getProducts', async () => {
    return await axios.get("https://lava-11a9b-default-rtdb.firebaseio.com/products.json")
        .then(res => res.data)
        .catch((error) => console.log(error))
});
const productslice = createSlice({
    name: "products",
    initialState,
    reducers: {
        pricerange(state) {
            const pricearray = [];
            state.productdata.map((pro) => {
                const price = pro.price;
                return pricearray.push(price);
            })
            const max = Math.max(...pricearray);
            const min = Math.min(...pricearray);
            state.minPrice = min;
            state.maxPrice = max;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, () => { })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.productdata = []
            for (const key in action.payload) {
                state.productdata.push({
                    id: key,
                    brand: action.payload[key].brand,
                    category: action.payload[key].category,
                    description: action.payload[key].description,
                    title: action.payload[key].title,
                    ImageUrl: action.payload[key].ImageUrl,
                    price: action.payload[key].price,
                    itemquantity: action.payload[key].itemquantity
                })
            }

        })
        builder.addCase(getProducts.rejected, () => { })
    }
});
export default productslice;
export const { pricerange, shuffle } = productslice.actions
export const productdata = (state) => state.product.productdata;
export const suffledata = (state) => state.product.suffleproducts;
export const minrange = (state) => state.product.minPrice;
export const maxringe = (state) => state.product.maxPrice;
