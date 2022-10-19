import { ProductContext } from "../features/products/ProductContext"
import { useContext } from "react"

export const useProductsContext = () => {
  const context =useContext(ProductContext)   

  if(!context){
    throw Error('useProductsContext must be used inside a ProductContextProvider')
  }

  return context
}
