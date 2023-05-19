import useAuth from "../hooks/useAuth";
import useUsers from "../hooks/useUsers";
import UserItem from "./UserItem";

export default function Users() {
  const { auth } = useAuth();

  const { users, deleteUser } = useUsers();
  console.log(users);
  return (
    <div className="bg-gray-100 min-h-full">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Users</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {users.map(
            (user) =>
              ((user.roles.Delivery || user.roles.Admin) &&
              auth?.user !== user.username) && (
                <UserItem key={user._id} user={user} deleteUser={deleteUser} />
              )
          )}
        </div>
      </div>
    </div>
  );
}
