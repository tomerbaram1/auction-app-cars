import { createContext, useReducer } from "react";

export const ProductContext = createContext();

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        products: [action.payload, ...state.products],
      };
    case "UPDATE_PRODUCT":
      return {
        products: state.products.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: null,
  });
  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
