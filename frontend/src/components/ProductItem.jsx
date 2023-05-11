import useAuth from "../hooks/useAuth";
import StatusProduct from "./StatusProduct";
import { BASE_URL } from "../api/axios";
import { formatterPrice } from "../../utils/priceFormatter";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { ROLES } from "../App";

import {
  TrashIcon,
  ShoppingCartIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/20/solid";
export default function ProductItem({ product, deleteProduct, setEdit, updateProduct }) {
  const { auth } = useAuth();
  const { addToCart } = useCart();
  const isDeliveryMan = auth?.roles?.includes(ROLES.Delivery);
  const isProductOwner = auth?.user === product.user.username;
  return (
    <div className="group bg-white p-3 rounded-xl flex flex-col">
      <Link to={`/product/${product._id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={`${BASE_URL + product.image}`}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
        <StatusProduct status={(isProductOwner || isDeliveryMan) ? product.status : false} />
      </Link>
      <div className="flex justify-between mt-auto">
        <div className="text-lg font-medium text-gray-900">
          {formatterPrice.format(product.price)}
        </div>

        {isDeliveryMan ? (
          <div className="space-x-1">
            <button
              className="items-center justify-center rounded-md border border-transparent bg-indigo-600 p-1 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => updateProduct({id: product._id, status: 'accepted'})}
            >
              <CheckCircleIcon className="w-6 flex-shrink-0" />
            </button>
            <button
              className="items-center justify-center rounded-md border border-transparent bg-amber-500 p-1 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
              onClick={() => updateProduct({id: product._id, status: 'inReview'})}
            >
              <MinusCircleIcon className="w-6 flex-shrink-0" />
            </button>
            <button
              onClick={() => updateProduct({id: product._id, status: 'rejected'})}
              className="items-center justify-center rounded-md border border-transparent bg-rose-600 p-1 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              <XCircleIcon className="w-6 flex-shrink-0" />
            </button>
          </div>
        ) : isProductOwner ? (
          <div className="space-x-1">
            <button
              className="items-center justify-center rounded-md border border-transparent bg-indigo-600 p-1 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => setEdit(product)}
            >
              <PencilSquareIcon className="w-6 flex-shrink-0" />
            </button>
            <button
              onClick={() => deleteProduct(product._id)}
              className="items-center justify-center rounded-md border border-transparent bg-rose-600 p-1 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              <TrashIcon className="w-6 flex-shrink-0" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="items-center justify-center rounded-md border border-transparent bg-indigo-600 p-1 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <ShoppingCartIcon className="w-6 flex-shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
}
