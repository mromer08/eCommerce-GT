/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import {
  TrashIcon,
  ShoppingCartIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import { formatterPrice } from "../../utils/priceFormatter";
import axios, { BASE_URL } from "../api/axios";
import AuthContext from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import StatusProduct from "./StatusProduct";
import { useCart } from "../hooks/useCart";

export default function ProductOverview() {
  const {addToCart} = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const getProduct = async () => {
    const res = await axios.get(`api/products/${id}`);
    return res.data;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct();
        setProduct(productData);
        console.log(productData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);
  const { auth } = useContext(AuthContext);
  return !product ? (
    <h1>No se encontró el producto que busca</h1>
  ) : (
    <div className="bg-white">
      <div className="pt-6">
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pb-24">
          <div className="lg:col-span-1">
            {/* Image */}
            <div className="aspect-h-5 aspect-w-4 sm:overflow-hidden sm:rounded-lg">
              <img
                src={`${BASE_URL + product.image}`}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-1 lg:pl-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              <div className="mt-6 space-x-2">
                <StatusProduct status={product.status}/>
                <span className="bg-indigo-100 text-sm p-1 rounded-lg">
                  {product.category.name}
                </span>
              </div>
              <div className="mt-6">
                <p className="text-3xl tracking-tight text-gray-900">
                  {formatterPrice.format(product.price)}
                </p>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="text-xl font-bold">Información del vendedor</h2>
                <Link
                  to={`/user/${product.user.username}`}
                  className="flex text-xl text-gray-900"
                >
                  <UserCircleIcon className="mr-5 w-7 flex-shrink-0" />
                  {`${product.user.firstname} ${product.user.lastname}`}
                </Link>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-bold">Descripción</h2>
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="flex mt-auto space-x-3">
              {auth?.user === product.user.username ? (
                <>
                  <button
                    type="submit"
                    className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <PencilSquareIcon className="mr-5 w-7 flex-shrink-0" />
                    Editar
                  </button>
                  <button
                    type=""
                    className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-8 py-3 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  >
                    <TrashIcon className="mr-5 w-7 flex-shrink-0" />
                    Eliminar
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <ShoppingCartIcon className="mr-5 w-7 flex-shrink-0" />
                  Añadir al carrito
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
