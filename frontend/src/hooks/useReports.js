import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { REPORTS } from "../App";

const REPORT_URL = "/api/reports";
const useReports = (type) => {
  const axiosPrivate = useAxiosPrivate();
  const [reports, setReports] = useState([]);

  const getProductCount = () => {
    axiosPrivate
      .get(`${REPORT_URL}/products-count`)
      .then((res) => setReports(res.data))
      .catch((err) => console.log(err));
  };

  const getOrderCount = (timeRange) => {
    axiosPrivate
      .post(`${REPORT_URL}/orders-count`, timeRange)
      .then((res) => setReports(res.data))
      .catch((err) => console.log(err));
  };

  const getSalesCount = (timeRange) => {
    axiosPrivate
      .post(`${REPORT_URL}/sales-count`, timeRange)
      .then((res) => setReports(res.data))
      .catch((err) => console.log(err));
  };
  const getProfitsCount = (timeRange) => {
    axiosPrivate
      .post(`${REPORT_URL}/profits-count`, timeRange)
      .then((res) => setReports(res.data))
      .catch((err) => console.log(err));
  };
  const getCustomersCount = (timeRange) => {
    axiosPrivate
      .post(`${REPORT_URL}/customers-count`, timeRange)
      .then((res) => setReports(res.data))
      .catch((err) => console.log(err));
  };

  const resetReports = () => setReports([]);

  useEffect(() => {
    if (type === REPORTS.inventoryCustomers) getProductCount();
    else resetReports();
  }, []);

  return {
    reports,
    getProductCount,
    getOrderCount,
    getSalesCount,
    getProfitsCount,
    getCustomersCount,
    resetReports,
  };
};

export default useReports;
