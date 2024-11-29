import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedIn } from "../authSlice";


const USER_API="http://localhost:8080/api/v1/user/"
export const authApi = createApi({
  reducerPath: "authApi", //name
  //The base query used by each endpoint if no queryFn option is specified.
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  //Endpoints are just a set of operations that you want to perform against your server.
  endpoints: (builder) => ({
    //builder is used for data fetching and data posting
    registerUser: builder.mutation(
      //for data posting mutation
      {
        query: (inputData) => ({
          url: "register", //http://localhost:8080/api/v1/user/register
          method: "POST",
          body: inputData,
        }),
      }
    ),
    loginUser: builder.mutation(
      
      {
        query: (inputData) => ({
          url: "login",
          method: "POST",
          body: inputData,
            }),
          //when a user login we will dispatch action for it we make this async func
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;//query fullfilled me sara data hoga user ka
            dispatch(userLoggedIn({ user: result.data.user }));
          } catch (error) {
            console.log(error);
          }
        },
      }
    ),
    loadUser: builder.query(
    //get krne time query
      {
        query: () => ({
          url: "profile",
          method: "GET",
        
        }),
      }
    )
  }),
});


export const {
    useRegisterUserMutation,
  useLoginUserMutation,
useLoadUserQuery} = authApi