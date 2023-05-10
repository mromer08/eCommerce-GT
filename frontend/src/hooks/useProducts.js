import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "./useAxiosPrivate";

const PRODUCTS_URL = "/api/products";
const useProducts = () => {
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);

  const getAllProducts = () => {
    axios
      .get(PRODUCTS_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const createNewProduct = (product) => {
    const formData = new FormData();
    
    for (let key in product) {
        formData.append(key, product[key]);
    }
    console.log(product)
    console.log('desde el reactt');
  
    axiosPrivate
      .post(PRODUCTS_URL, formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProduct = (id) => {
    return axios
      .get(`${PRODUCTS_URL}/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const deleteProduct = async (id) => {
    axiosPrivate
      .delete(PRODUCTS_URL, { data: { id } })
      .then((res) => {
        getAllProducts();
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return {
    products,
    getAllProducts,
    getProduct,
    deleteProduct,
    createNewProduct,
  };
};

export default useProducts;
