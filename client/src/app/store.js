import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./rootReducer"
import { authApi } from "@/features/api/authApi"
import { courseApi } from "@/features/api/courseApi";

export const appStore = configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware)=> defaultMiddleware().concat(authApi.middleware,courseApi.middleware)//middleware is important for rtk query..it automates everything like loading and all
}) 

//this func is for-> jab refresh mare to sabse pehle redux store me user le aao baki sb baadme dekege is func se redux me user aa jata h refresh hote hi user ud ta nhi
const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();