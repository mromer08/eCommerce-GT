import { PhotoIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import { BASE_URL } from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

function ProductForm({
  edit = {
    name: "",
    description: "",
    amount: 1,
    category: "",
  },
  setEdit,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createNewProduct, updateProduct } = useProducts();
  const { categories } = useCategories();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: edit.name,
      description: edit.description,
      price: edit.price,
      amount: edit.amount,
      category: edit.category,
    },
  });
  const onSubmit = (data) => {
    if (data.image) {
      data.image = data.image[0];
    }
    if (edit._id) {
      data.id = edit._id;
      updateProduct(data);
      setEdit({});
    } else {
      createNewProduct(data);
    }
    navigate(from, { replace: true });
  };

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-12">
            <div>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  {edit._id ? "Editar" : "Nuevo"} producto
                </h2>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      type="text"
                      {...register("name", { required: true })}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="desciption"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Descripción
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="desciption"
                      name="desciption"
                      rows={3}
                      {...register("description", { required: true })}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Precio
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="price"
                      {...register("price", {
                        required: true,
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/, // Expresión regular para validar números con hasta 2 decimales
                          message: "Por favor, ingresa un precio válido",
                        },
                      })}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.price && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.price.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cantidad
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="amount"
                      {...register("amount", { required: true })}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="tag"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Categoria
                  </label>
                  <div className="mt-2">
                    <select
                      id="tag"
                      {...register("category", { required: true })}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {edit.image ? (
                  <div className="col-span-full">
                    <img src={`${BASE_URL}/${edit.image}`} alt={edit.name} />
                  </div>
                ) : (
                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Imágen
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="image"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <input
                              id="image"
                              type="file"
                              {...register("image")}
                            />
                          </label>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF hasta 1MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {edit._id ? "Editar" : "Crear"} producto
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProductForm;
