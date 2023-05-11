import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const SALE_URL = "/api/sales";
const useSales = () => {
  const axiosPrivate = useAxiosPrivate();  

  const getAllsales = () => {
    axiosPrivate
      .get(SALE_URL)
      .then((res) => setSales(res.data))
      .catch((err) => console.log(err));
  };

  const createNewCard = (card) => {
    console.log(card);
    axiosPrivate
      .post(SALE_URL, card)
      .then((res) => {
        getAllsales();
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteCard = async (id) => {
    axiosPrivate
      .delete(SALE_URL, { data: { id } })
      .then((res) => {
        getAllsales();
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllsales();
  }, []);

  return {
    sales,
    createNewCard,
    deleteCard
  };
};

export default useSales;
