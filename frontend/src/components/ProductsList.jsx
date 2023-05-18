import { useState } from "react";
import ProductItem from "./ProductItem";
import useProducts from "../hooks/useProducts";
import ProductForm from "./ProductForm";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../App";

export default function ProductsList({ profile = false }) {
  const { products, deleteProduct, updateProduct } = useProducts();
  const { auth } = useAuth();
  const [edit, setEdit] = useState({});
  if (edit._id) {
    return <ProductForm edit={edit} setEdit={setEdit} />;
  }
  const filteredProducts = products.filter((product) => {
    if (profile && auth?.user === product.user?.username) {
      return true; // Mostrar todos los productos del usuario si el perfil está activado
    } else if (auth?.roles?.includes(ROLES.Delivery)) {
      return product.status === "inReview";
    } else {
      return (
        !profile &&
        auth?.user !== product.user?.username &&
        product.status === "accepted" &&
        product.amount > 0
      );
    }
  });
  
  return (
    <div className="bg-gray-100 h-full">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.length === 0 && (<p>No hay productos para mostrar</p>)}
          {filteredProducts.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
              setEdit={setEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
