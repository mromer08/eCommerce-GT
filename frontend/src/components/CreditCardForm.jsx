import { useForm } from "react-hook-form";

function CreditCardForm({createNewCard}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data)
    createNewCard(data);
  };

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-12">
            <div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Número de la tarjeta
                  </label>
                  <div className="mt-2">
                    <input
                      id="number"
                      type="text"
                      {...register("number", {
                        required: true,
                        pattern: /^\d{16}$/
                      })}
                      placeholder="0000 0000 0000 0000"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 sm:col-start-1">
                  <label
                    htmlFor="expirationDate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de expiración
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      id="expirationDate"
                      {...register("expirationDate")}
                      placeholder="MM/YY"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="cvcCode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cantidad
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="cvcCode"
                      {...register("cvcCode", {required: true})}
                      placeholder="000"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="holderName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre del titular
                  </label>
                  <div className="mt-2">
                    <input
                      id="holderName"
                      type="text"
                      {...register("holderName", {required: true})}
                      placeholder="Como aparece en la tarjeta"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

              </div>
            </div>
            <div>
              <button 
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Aceptar
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreditCardForm;
