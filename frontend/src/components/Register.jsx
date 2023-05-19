import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROLES } from "../App";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import useUsers from "../hooks/useUsers";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; //qwert12345M!
const REGISTER_URL = "/api/register";

const Register = ({
  admin = false,
  updateUser,
  setEdit,
  edit = {
    username: "",
    firstname: "",
    lastname: "",
    roles: {},
  },
}) => {
  const nameRef = useRef();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(edit.username);
  const [validName, setValidName] = useState(false);

  const [rol, setRol] = useState(
    edit.roles.Admin || edit.roles.Delivery || ROLES.Admin
  );
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [firstname, setFirstName] = useState(edit.firstname);
  const [lastname, setLastName] = useState(edit.lastname);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/users";

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    // if (!v1 || !v2) {
    //   setErrMsg("Invalid Entry");
    //   return;
    // }
    try {
      if (!admin) {
        const response = await axios.post(
          REGISTER_URL,
          JSON.stringify({
            username: user,
            password: pwd,
            firstname,
            lastname,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(response?.data));
      } else {
        const rolObj = {};
        for (const key in ROLES) {
          console.log(ROLES[key], rol);
          if (ROLES[key].toString() === rol.toString()) {
            rolObj[key] = Number(rol);
          }
        }
        if (edit._id) {
          const response = await updateUser({
            _id: edit._id,
            password: pwd.trim().length > 3 ? pwd : false,
            firstname,
            lastname,
            roles: rolObj,
          });
          console.log(response?.data);
          setEdit({});
        } else {
          const response = await axiosPrivate.post("/api/users", {
            username: user,
            password: pwd,
            firstname,
            lastname,
            roles: rolObj,
          });
          console.log(response?.data);
        }
        navigate(from, { replace: true });
      }
      // TODO: remove console.logs before deployment
      //console.log(JSON.stringify(response))
      //clear state and controlled inputs
      setUser("");
      setPwd("");
      setMatchPwd("");
      if (auth?.roles?.includes(ROLES.Admin)) navigate("/users");
      else navigate("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      //   errRef.current.focus();
    }
  };

  return (
    <>
      (
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-12">
              <div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                    className="mx-auto h-20 w-auto"
                    src="gt.png"
                    alt="eCommerce GT"
                  />
                  {admin ? (
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      {edit._id
                        ? `Editar cuenta de empleado`
                        : `Nueva cuenta de empleado`}
                    </h2>
                  ) : (
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Crea tu cuenta de <br /> eCommerce GT
                    </h2>
                  )}
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nombre
                    </label>
                    <div className="mt-2">
                      <input
                        name="firstname"
                        id="firstname"
                        type="text"
                        ref={nameRef}
                        autoComplete="off"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstname}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Apellido
                    </label>
                    <div className="mt-2">
                      <input
                        name="lastname"
                        id="lastname"
                        type="text"
                        autoComplete="off"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastname}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Usuario
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="username"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        readOnly={edit._id ? true : false}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contraseña
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="confirm_pwd"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirmación
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="confirm_pwd"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {admin && (
                    <div className="col-span-full">
                      <label
                        htmlFor="rol"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Rol
                      </label>
                      <div className="mt-2">
                        <select
                          id="rol"
                          name="rol"
                          type="rol"
                          autoComplete="off"
                          onChange={(e) => setRol(e.target.value)}
                          value={rol}
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option value={ROLES.Admin}>Admin</option>
                          <option value={ROLES.Delivery}>Delivery</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {edit._id ? `Editar cuenta` : `Crear cuenta`}
                </button>
              </div>
            </div>
          </form>

          {!admin && (
            <p className="mt-10 text-center text-sm text-gray-500">
              ¿Ya estas registrado?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Inicia Sesión
              </Link>
            </p>
          )}
        </div>
      </section>
      )
    </>
  );
};

export default Register;
