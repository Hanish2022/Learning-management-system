import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
};
const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;//userLoggedIn({name : "hanish"})
            state.isAuthenticated = true;
        },
        userLoggedOut: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions;//slicers k functions ko indvidual export 
export default authSlice.reducer;//store me dalne k liye pure slicer ko export