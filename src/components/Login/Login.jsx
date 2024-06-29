import { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";

import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

import { fetch } from "../../utils/authFetch";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const { token, setToken } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
        navigate('/admin');
    }
  }, [token, navigate]);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, status } = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/login`, "POST", {
          username,
          password,
      });

      if (status === 200) {
        const { encoded } = data;
        setToken(encoded);
        navigate("/admin");
      }
    } catch(err) {
      const { response: { data: { error } } } = err;
      setErrorMessage(error);
    }

    /*const { success, encoded } = await request.json();

    if (success && encoded) {
        setToken(encoded);
        navigate("/admin");
    }*/
  };

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 flex">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src="/img/logo.png" alt="logo" />
          CONNIEYEPIZ
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Inicia sesión como administrador
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onFormSubmit}>
              <div>
                <Label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Usuario
                </Label>
                <TextInput
                  type="text"
                  name="username"
                  id="username"
                  placeholder="usuario"
                  value={username}
                  color={errorMessage && "failure"}
                  onChange={onUsernameChange}
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </Label>
                <TextInput
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={onPasswordChange}
                  color={errorMessage && "failure"}
                  helperText={errorMessage}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-100 hover:bg-primary-150 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Inicia sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
