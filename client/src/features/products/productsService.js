import axios from 'axios'

const API_URL= "/api/products"

// add new product

const newProduct= async (productsData,token) => {
    const config ={
        headers:{
            Authorization:`Bearer ${token}`
         }
    }

    const response = await axios.post(API_URL,productsData,config)
    return response.data
}

const productsService ={
    newProduct
}
export default productsService