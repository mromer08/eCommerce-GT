import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { REPORTS } from "../App";

const REPORT_URL = "/api/reports";
const useReports = () => {
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

  useEffect(()=>{
    getProductCount();
  }, [])

  return {
    reports,
    getProductCount,
    getOrderCount,
    getSalesCount,
    getProfitsCount,
  };
};

export default useReports;
