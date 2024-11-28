import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./rootReducer"
import { authApi } from "@/features/api/authApi"

export const appStore = configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware)=> defaultMiddleware().concat(authApi.middleware)//middleware is important for rtk query..it automates everything like loading and all
})