import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../services/apiServices";
import { ProductDetail } from "../../interface/Product";

interface Product {
    products:Array<ProductDetail>
  id: number;
  name: string;
}

interface ProductState {
  products: Array<Product>;
  loading:boolean,
  error:null | string
}

const initialState: ProductState = {
  products: [],
  loading:false,
  error:null
};


export const fetchProducts = createAsyncThunk<Array<Product>, void, { rejectValue: string }>(
    "product/fetchProducts",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_BASE_URL}products?limit=12&skip=10`);
        const data = await response.json();
        return data?.products;
      } catch (error: any) {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  );
  

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
        debugger
        if (Array.isArray(state.products)) {
            state.products.push(action.payload);
          } else {
            state.products = [action.payload,...state.products];
          }
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Array<Product>>) => {
        debugger
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProducts, addProduct:sliceAddProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
