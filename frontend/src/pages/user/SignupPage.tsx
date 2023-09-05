import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/slices/userSlice";
import { useEffect, useState } from "react";
import Loading from "../../components/shimmer/Loading";
import { toast } from "react-toastify";
import { authRequest } from "../../api/requests/authRequest";
import {
  AuthResponse,
  userInterface,
} from "../../state/interface/userInterface";

const signupSchema = Yup.object({
  name: Yup.string()
    .min(4)
    .max(15)
    .required("Please enter your name ")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "* This field cannot contain white space and special character"
    ),
  email: Yup.string().email().required("Please enter your username "),
  password: Yup.string().min(5).max(15).required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: async (values) => {
        setLoading(true);
        const {
          name,
          email,
          password,
        }: { name: string; email: string; password: string } = values;
        const userData = { name, email, password };
        const response: AuthResponse = await authRequest.Register(userData);
        if (response.status == "success") {
          const { user, token }: { user?: userInterface; token?: string } =
            response;
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
          toast.success("Please verify your email", {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
          setLoading(false);
          dispatch(setLogin({ user: user, token: token }));
        } else {
          toast.error(response.message, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
          setLoading(false);
        }
      },
    });

  return (
    <>
      {loading && <Loading />}
      <div className="h-screen flex items-center w-full bg-slate-100">
        <div className="container max-w-md mx-auto xl:max-w-4xl h-screeen flex overflow-hidden">
          <div className="w-full xl:w-1/2 p-8 ">
            <form onSubmit={handleSubmit}>
              <div>
                <h1 className="text-2xl font-bold"> Create an account </h1>
                <span className="text-gray-600 text-sm">
                  Already have an account ?
                </span>
                <Link
                  to="/login"
                  className="text-gray-700 pl-2 text-sm font-semibold"
                >
                  SignIn
                </Link>
              </div>
              <div className="mb-2 mt-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="name"
                >
                  Username
                </label>
                <input
                  className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-9"
                  id="name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                />
                {errors.name && touched.name ? (
                  <p className="text-xs text-red-700">{errors.name}</p>
                ) : null}
              </div>

              <div className="my-2">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-9"
                  id="email"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your username"
                />
                {errors.email && touched.email ? (
                  <p className="text-xs text-red-700">{errors.email}</p>
                ) : null}
              </div>

              <div className="my-2 ">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="password"
                >
                  Enter password
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-9"
                  id="password"
                  type="text"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                />
                {errors.password && touched.password ? (
                  <p className="text-xs text-red-700">{errors.password}</p>
                ) : null}
              </div>

              <div className="my-2 ">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="confirm_password"
                >
                  Confirm password
                </label>

                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-9"
                  id="confirm_password"
                  type="password"
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="text-xs text-red-700">
                    {errors.confirm_password}
                  </p>
                ) : null}
              </div>

              <div className="flex w-full mt-8">
                <button
                  className="w-full bg-gray-800 hover:bg-gray-950 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div className="relative hidden xl:block xl:w-1/2 h-full">
            <img
              className="absolute h-auto p-5 w-full object-cover"
              src="../../../public/signup-image.png"
              alt="my zomato
          "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
