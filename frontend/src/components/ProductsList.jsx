import { useEffect, useState } from "react";
import axios, { BASE_URL } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ProductItem from "./ProductItem";

const PRODUCTS_URL = '/api/products';
export default function ProductsList() {
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);
  
  const getAllProducts = async () => {
    const res = await axios.get("/api/products");
    return res.data;
  };
  
  const deleteProduct = async (id) => {
    try {
      const res = await  axiosPrivate.delete(PRODUCTS_URL, {data: {id}});
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
        console.log(productsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductItem 
            key={product._id}
            product={product}
             />
          ))}
        </div>
      </div>
    </div>
  );
}
