import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    bookingitem: [],
    totalquantity: 0,
    totalprice: 0
}

const bookingslice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addservicetobooking(state, action) {
            const itemindex = state.bookingitem.findIndex((item) => item.id === action.payload.id);
            if (itemindex < 0) {
                const tempitem = { ...action.payload };
                state.bookingitem.push(tempitem);
                state.totalquantity += 1
                state.totalprice += (+action.payload.price)
                toast.success(`${action.payload.title} added to booking`, {
                    position: "top-left",
                });
            }
            else {
                toast.info(`${action.payload.title} is already added `, {
                    position: "top-left",
                });
            }
        },
        adddetailstobooking(state, action) {
            const itemindex = state.bookingitem.findIndex((item) => item.id === action.payload.id);
            if (itemindex < 0) {
                const tempitem = { ...action.payload };
                state.bookingitem.push(tempitem);
                state.totalquantity += 1
                state.totalprice += (+action.payload.price)
                toast.success(`${action.payload.title} added to booking`, {
                    position: "top-left",
                });
            }
            else {
                toast.info(`${action.payload.title} is already added `, {
                    position: "top-left",
                });
            }
        },
        deletefrombooking(state, action) {
            const itemindex = state.bookingitem.findIndex((item) => item.id === action.payload.id);
            if (itemindex < 0) {
                const tempitem = { ...action.payload, itemquantity: 1 };
                state.bookingitem.push(tempitem);
                state.totalquantity += 1
                state.totalprice += (+action.payload.price)
                toast.success(`${action.payload.title} added to booking`, {
                    position: "top-left",
                });
            }
            else {
                state.bookingitem[itemindex].itemquantity += 1;
                state.totalquantity += 1
                state.totalprice += (+state.bookingitem[itemindex].price)
                toast.info(`${action.payload.title} increased by one`, {
                    position: "top-left",
                });
            }
        }

    },
})
export const bookingitem = (state) => state.booking.bookingitem;
export const totalquantity = (state) => state.booking.totalquantity;
export const totalprice = (state) => state.booking.totalprice;

// export const isloading = state => state.booking.isloading
export const { deletefrombooking, addservicetobooking, adddetailstobooking } = bookingslice.actions
export default bookingslice