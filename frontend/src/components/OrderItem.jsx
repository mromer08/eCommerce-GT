import useAuth from "../hooks/useAuth";
import { formatterPrice } from "../../utils/priceFormatter";
import { PencilSquareIcon, TruckIcon } from "@heroicons/react/20/solid";
import { ROLES } from "../App";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { utcToZonedTime, format } from "date-fns-tz";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function OrderItem({ order, updateOrder }) {
  const { auth } = useAuth();
  const [editDate, setEditDate] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      deliveryETA: new Date(order.deliveryETA).toLocaleDateString("en-CA"),
    },
  });

  const onSubmit = (data) => {
    data.id = order._id;
    updateOrder(data);
    setEditDate(false);
  };
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
        <p className=" text-sm text-gray-700">{`Pedido hace: ${formatDistanceToNow(
          utcToZonedTime(new Date(order.createdAt), "America/Guatemala"),
          { locale: es }
        )}`}</p>
        <p className=" text-sm text-gray-700">{`Se entrega en: ${formatDistanceToNow(
          utcToZonedTime(new Date(order.deliveryETA), "America/Guatemala"),
          { locale: es }
        )}`}</p>
      </div>
      <div className="flex justify-between mt-auto">
        <div className="text-lg font-medium text-gray-900">
          {formatterPrice.format(order.sale.total)}
        </div>
        {auth?.roles?.includes(ROLES.Delivery) && (
          <div className="space-x-1">
            <button
              className="items-center justify-center rounded-md border border-transparent bg-indigo-600 p-1 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => setEditDate((prev) => !prev)}
            >
              <PencilSquareIcon className="w-6 flex-shrink-0" />
            </button>
            <button
              onClick={() => updateOrder({ id: order._id, isComplete: true })}
              className="items-center justify-center rounded-md border border-transparent bg-lime-600 p-1 text-base font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
            >
              <TruckIcon className="w-6 flex-shrink-0" />
            </button>
          </div>
        )}
      </div>
      {editDate && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4 sm:col-start-1">
              <label
                htmlFor="deliveryETA"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fecha de entrega
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="deliveryETA"
                  {...register("deliveryETA", { required: true })}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-8">
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Cambiar
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
