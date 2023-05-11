import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { ROLES } from "../App";

const ORDERS_URL = "/api/orders";
const useOrders = () => {
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getAllOrders = () => {
    axiosPrivate
      .get(ORDERS_URL)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  const getProfileOrders = () => {
    console.log("estoy en el proeile");
    axiosPrivate
      .get(`${ORDERS_URL}/user`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  const updateOrder = (order) => {
    axiosPrivate
      .put(ORDERS_URL, order)
      .then((res) => {
        getAllOrders();
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (auth?.roles?.includes(ROLES.Delivery)) getAllOrders();
    else getProfileOrders();
  }, []);

  return {
    orders,
    getAllOrders,
    getProfileOrders,
    updateOrder,
  };
};

export default useOrders;
