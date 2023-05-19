export default function TopCustomerProducts({ reports }) {
  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="font-bold w-1/6 border-b border-gray-200 py-4">No.</th>
          <th className="font-bold w-2/6 border-b border-gray-200 py-4">
            Usuario
          </th>
          <th className="font-bold w-3/6 border-b border-gray-200 py-4">
            Productos Vendidos
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
              {report.countSale}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
