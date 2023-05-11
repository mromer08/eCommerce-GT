import { TrashIcon, TruckIcon } from "@heroicons/react/20/solid";

export default function UserItem({ user, deleteUser }) {
  const role = user.roles.Admin
    ? "Admin"
    : user.roles.Delivery
    ? "Paqueteria"
    : "Usuario";
  return (
    <div className="group bg-white p-3 rounded-xl flex flex-col">
      <div>
        <span className="bg-indigo-100 text-sm p-1 rounded-lg">{role}</span>
        <h3 className="mt-4 text-sm text-gray-700">{`@${user.username}`}</h3>
      </div>
      <div className="flex justify-between mt-auto">
        <div className="text-lg font-medium text-gray-900">
          {`${user.firstname} ${user.lastname}`}
        </div>
        <button
          onClick={() => deleteUser({ id: user._id })}
          className="items-center justify-center rounded-md border border-transparent bg-rose-600 p-1 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        >
          <TrashIcon className="w-6 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}
