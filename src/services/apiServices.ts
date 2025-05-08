import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductDetail } from "../interface/Product";

const STAGING_API_BASE_URL = "http://localhost:3000/";
const LIVE_API_BASE_URL = "https://nextjsmastermoduleprototype.vercel.app/";
export const API_BASE_URL = STAGING_API_BASE_URL;

export interface Product extends ProductDetail {
  id: number;
  name: string;
}

export const apiServices = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "",
    }),
    addProduct: builder.mutation<Product, { title: string }>({
      query: (newProduct) => ({
        url: "/products/add",
        method: "POST",
        body: newProduct,
      }),
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (updatedProduct) => ({
        url: `/products/${updatedProduct.id}`,
        method: "PUT",
        body: JSON.stringify(updatedProduct),
      }),
    }),
    deleteProduct: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = apiServices;
