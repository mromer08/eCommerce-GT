import { formatterPrice } from "../../../utils/priceFormatter";

export default function TopProfits({ reports }) {
  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="font-bold w-1/6 border-b border-gray-200 py-4">No.</th>
          <th className="font-bold w-2/6 border-b border-gray-200 py-4">
            Usuario
          </th>
          <th className="font-bold w-3/6 border-b border-gray-200 py-4">
            Ganancias para el usuario
          </th>
          <th className="font-bold w-3/6 border-b border-gray-200 py-4">
            Ganancias para la empresa
          </th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => (
          <tr key={index}>
            <td className="font-bold text-center border-b border-gray-200 py-4">
              {index + 1}
            </td>
            <td className="text-gray-500 border-b border-gray-200 py-4">
              {`${report.firstname} ${report.lastname}`}
            </td>
            <td className="text-gray-500 text-center border-b border-gray-200 py-4">
            {formatterPrice.format(report.userProfit)}
            </td>
            <td className="text-gray-500 text-center border-b border-gray-200 py-4">
            {formatterPrice.format(report.companyProfit)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
