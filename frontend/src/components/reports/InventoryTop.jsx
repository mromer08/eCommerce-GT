export default function InventoryTop({ reports }) {
  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="font-bold w-1/6 border-b border-gray-200 py-4">No.</th>
          <th className="font-bold w-2/6 border-b border-gray-200 py-4">
            Cliente
          </th>
          <th className="font-bold w-3/6 border-b border-gray-200 py-4">
            Productos a la venta
          </th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => (
          <tr key={index}>
            <td className="font-bold text-center border-b border-gray-200 py-4">
              {index + 1}
            </td>
            <td className="text-gray-500 border-b border-gray-200 py-4">{`${report.firstname} ${report.lastname}`}</td>
            <td className="text-gray-500 text-center border-b border-gray-200 py-4">
              {report.productCount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
