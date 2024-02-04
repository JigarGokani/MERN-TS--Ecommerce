import {fetchBaseQuery,createApi} from "@reduxjs/toolkit/query/react"
import { AllProductsResponse, CategoriesResponse } from "../../types/api-types"

export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
      latestProducts: builder.query<AllProductsResponse, string>({
        query: () => "latest",
        providesTags: ["product"],
      }),
      allProducts: builder.query<AllProductsResponse, string>({
        query: (id) => `admin-products?id=${id}`,
        providesTags: ["product"],
      }),
      categories: builder.query<CategoriesResponse, string>({
        query: () => `categories`,
        providesTags: ["product"],
      }),
    })
})


export const {useLatestProductsQuery,useAllProductsQuery,useCategoriesQuery} = productAPI