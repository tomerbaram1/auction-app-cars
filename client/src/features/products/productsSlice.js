import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import productsService from './productsService'

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''

}

// add new products
export const newProduct = createAsyncThunk('products/create',
async(productData,thunkAPI) => {
    try {
        const token = thunkAPI.getState().autn.user.token
        return await productsService.newProduct(productData,token)
    } catch (error) {
        const message = (error.response &&
            error.response.data 
           && error.response.data.message)||
           error.message ||
            error.toString()
           return thunkAPI.rejectWithValue(message)
    }
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(builder) =>{
        builder
          .addCase(newProduct.pending, (state) =>{
            state.isLoading = true
          })
          .addCase(newProduct.fulfilled, (state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.products.push(action.payload)
          })
          .addCase(newProduct.rejected, (state,action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
          })
    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer