import { useEffect, useState } from "react";
import axios from "../api/axios";

const CATEGORIES_URL = "/api/categories";
const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    axios
      .get(CATEGORIES_URL)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return {
    categories
  };
};

export default useCategories;
