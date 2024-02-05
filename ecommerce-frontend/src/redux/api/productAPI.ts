import {fetchBaseQuery,createApi} from "@reduxjs/toolkit/query/react"
import { AllProductsResponse, CategoriesResponse, SearchProductsRequest, SearchProductsResponse } from "../../types/api-types"

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
      searchProducts: builder.query<
      SearchProductsResponse,
      SearchProductsRequest
    >({
      query: ({ price, search, sort, category, page }) => {
        let base = `searchall?search=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags: ["product"],
    }),
    })
})


export const {useLatestProductsQuery,useAllProductsQuery,useCategoriesQuery,useSearchProductsQuery} = productAPI