import useAuth from "../hooks/useAuth";
import StatusProduct from "./StatusProduct";
import { BASE_URL } from "../api/axios";
import { formatterPrice } from "../../utils/priceFormatter";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

import { TruckIcon } from "@heroicons/react/20/solid";
import { ROLES } from "../App";
import { formatDistanceToNow } from "date-fns";
export default function OrderItem({ order, updateOrder }) {
  const { auth } = useAuth();
  return (
    <div className="group bg-white p-3 rounded-xl flex flex-col">
      <div>
        <h3 className="mt-4 text-sm text-gray-700">{`Orden #${order._id}`}</h3>
        <span
          className={
            order.isComplete
              ? "bg-emerald-400 text-sm p-1 rounded-lg"
              : "bg-amber-400 text-sm p-1 rounded-lg"
          }
        >
          {order.isComplete ? "Entregado" : "En curso"}
        </span>
        <h3 className="mt-4 text-sm text-gray-700">{`Cliente: ${order.user.firstname} ${order.user.lastname}`}</h3>
        <p className=" text-sm text-gray-700">{`Pedido hace: ${formatDistanceToNow(new Date(order.createdAt))}`}</p>
        <p className=" text-sm text-gray-700">{`Se entrega en: ${formatDistanceToNow(new Date(order.deliveryETA))}`}</p>
      </div>
      <div className="flex justify-between mt-auto">
        <div className="text-lg font-medium text-gray-900">
          {formatterPrice.format(order.sale.total)}
        </div>
        {auth?.roles?.includes(ROLES.Delivery) && (
          <button
            onClick={() => updateOrder({ id: order._id, isComplete: true })}
            className="items-center justify-center rounded-md border border-transparent bg-indigo-600 p-1 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <TruckIcon className="w-6 flex-shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
}
