/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiCalls } from "../../api/user/apiCalls";
import {
  AuthResponse,
  userInterface,
} from "../../state/interface/userInterface";
import { setLogin } from "../../state/slices/userSlice";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Loading from "../../components/user/Loading";


const loginSchema = Yup.object({
  name: Yup.string().min(4).max(15).required("Please enter your username "),
  password: Yup.string().required("Please enter your password"),
});

const initialValues: { name: string; password: string } = {
  name: "",
  password: "",
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        setLoading(true)
        const { name, password }: { name: string; password: string } = values;
        const userData = { name, password };
        const response: AuthResponse = await apiCalls.Login(userData);

        if (response.status == "success") {
          const {
            user,
            token
          }: {
            user: userInterface;
            token: string;
            message: string;
            status: string;
          } = response;
          dispatch(setLogin({ user: user, token: token }));
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          toast.error( response.message, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
         setLoading(false)
        }
      },
    });

  const googleAuthSubmit = async ({
    email,
    name,
    picture,
  }: {
    email: string;
    name: string;
    picture: string;
    googleUser: boolean;
  }) => {
    setLoading(true)
    const userData = { email, name, picture, googleUser: true };
    const response: AuthResponse = await apiCalls.googleAuth(userData);

    if (response.status == "success") {
      
      const {
        user,
        token,
      }: {
        user: userInterface;
        token: string;
        message: string;
        status: string;
      } = response;
      dispatch(setLogin({ user: user, token: token }));
      localStorage.setItem("token", token);
      navigate("/");
    } else {

      toast.error( response.message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
     setLoading(false)
    }
  };

  return (
    <>
    { loading && <Loading /> }
    <div className="h-screen flex items-center w-full bg-slate-100">
      <ToastContainer />
      <div className="container max-w-md mx-auto xl:max-w-4xl h-screeen flex bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative hidden xl:block xl:w-1/2 h-full">
          <img
            className="absolute h-auto w-full object-cover"
            src="https://e1.pxfuel.com/desktop-wallpaper/967/276/desktop-wallpaper-19-8-mil-me-gusta-140-comentarios-juice-box.jpg"
            alt="Login image
          "
          />
        </div>
        <div className="w-full xl:w-1/2 p-8">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold">Sign in to your account</h1>
            <div>
              <span className="text-gray-600 text-sm">
                Dont have an account?
              </span>
              <Link
                to="/register"
                className="text-gray-700 text-sm pl-2 font-semibold"
              >
                Sign up
              </Link>
            </div>
            <div className="mb-4 mt-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Username
              </label>
              <input
                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                id="name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Account username"
              />
              {errors.name && touched.name ? (
                <p className="text-xs text-red-700">{errors.name}</p>
              ) : null}
            </div>
            <div className="mb-6 mt-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                id="password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your password"
              />
              { errors.password && touched.password ? (
                <p className="text-xs text-red-700">{errors.password}</p>
              ) : null}
              <div className="w-full text-right">
                <Link
                  className=" text-sm  text-gray-600 hover:text-gray-800"
                  to="/"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="flex w-full mt-1">
              <button
                className="w-full bg-gray-800 hover:bg-gray-950 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-3 flex justify-center ">
            <GoogleOAuthProvider clientId="173949417348-24u0t6a4g2rougvnmuea8ar64kg151un.apps.googleusercontent.com">
              <GoogleLogin 
                onSuccess={(credentialResponse) => {
                  var decoded: any = jwt_decode(credentialResponse.credential);
                  googleAuthSubmit(decoded);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
