import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authslice from './slice/authslice';
import cartslice from './slice/cartslice';
import productslice from './slice/productslice';
import filterslice from './slice/filterslice';
import orderslice from './slice/orderslice';
import bookingslice from './slice/bookingslice';
const rootreducer = combineReducers({
    auth: authslice.reducer,
    cart: cartslice.reducer,
    product: productslice.reducer,
    order: orderslice.reducer,
    filter: filterslice.reducer,
    booking: bookingslice.reducer
});
const store = configureStore({
    reducer: rootreducer
})
export default store;