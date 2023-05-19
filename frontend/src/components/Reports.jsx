import { useForm } from "react-hook-form";
import useReports from "../hooks/useReports";
import { REPORTS } from "../App";
import InventoryTop from "./reports/InventoryTop";
import TopSoldProducts from "./reports/TopSoldProducts";
import TopCustomerProducts from "./reports/TopCustomerProducts";
import TopProfits from "./reports/TopProfits";
import TopOrders from "./reports/TopOrders";

export default function Reports({ type }) {
  const {
    reports,
    getSalesCount,
    getOrderCount,
    getProfitsCount,
    getCustomersCount,
    resetReports,
  } = useReports();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: new Date().toLocaleDateString("en-CA"),
      endDate: new Date().toLocaleDateString("en-CA"),
    },
  });
  const reportTitle = [
    "Top de productos más vendidos",
    "Top de clientes con más ganancias",
    "Top de clientes con más productos vendidos",
    "Top de clientes que más pedidos han hecho",
    "Top de clientes con más inventario a la venta",
  ];
  const onSubmit = (data) => {
    if (type === REPORTS.topSales) {
      getSalesCount(data);
    } else if (type === REPORTS.topCustomers) {
      getProfitsCount(data);
    } else if (type === REPORTS.featuredCustomers) {
      getCustomersCount(data);
    } else if (type === REPORTS.activeCustomers) {
      getOrderCount(data);
    }
    resetReports();
  };

  return (
    <div className="w-3/4 mx-auto max-w-screen-md py-10">
      <h1 className="text-2xl font-bold mb-4 text">{reportTitle[type]}</h1>
      {type !== REPORTS.inventoryCustomers && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fecha inicial
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="startDate"
                  {...register("startDate", { required: true })}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fecha final
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="endDate"
                  {...register("endDate", { required: true })}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-8">
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Generar reporte
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {type === REPORTS.activeCustomers ? (
        <TopOrders reports={reports} />
      ) : type === REPORTS.featuredCustomers ? (
        <TopCustomerProducts reports={reports} />
      ) : type === REPORTS.topSales ? (
        <TopSoldProducts reports={reports} />
      ) : type === REPORTS.topCustomers ? (
        <TopProfits reports={reports} />
      ) : (
        <InventoryTop />
      )}
    </div>
  );
}
