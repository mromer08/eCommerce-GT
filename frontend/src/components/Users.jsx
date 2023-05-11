import { useState } from "react";
import useOrders from "../hooks/useOrders";
import OrderItem from "./OrderItem";
import useAuth from "../hooks/useAuth";

export default function Users() {

    const {orders, getProfileOrders, updateOrder} = useOrders();
    const {auth} = useAuth();
  return (
    <div className="bg-gray-100 min-h-full">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Orders</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {orders.map((order) => (
            <OrderItem
              key={order._id}
              order={order}
              updateOrder={updateOrder}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
