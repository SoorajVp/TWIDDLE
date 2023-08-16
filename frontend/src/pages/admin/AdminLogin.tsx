/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useFormik } from "formik";
import * as Yup from "yup";
import { adminRequest } from "../../api/requests/adminRequests";
import { AdminAuthResponse } from "../../state/interface/userInterface";
import { useDispatch } from "react-redux";
import { setAdminLogin } from "../../state/slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const loginSchema = Yup.object({
  name: Yup.string().required("Please enter your username "),
  password: Yup.string().required("Please enter your password"),
});

const initialValues: { name: string; password: string } = {
  name: "",
  password: "",
};

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/admin");
    }
  }, []);

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        const { name, password }: { name: string; password: string } = values;
        const data = { name, password };
        const response: AdminAuthResponse = await adminRequest.adminLogin(data);
        if (response.status == "success") {
          const { admin, token } = response;
          dispatch(setAdminLogin({ admin, token }));
          localStorage.setItem("adminToken", token);
          navigate("/admin");
        } else {
          toast.error(response.message, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
        }
      },
    });

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <ToastContainer />
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Welcome Admin</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleSubmit}>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                      />
                      {errors.name && touched.name ? (
                        <p className="text-xs text-red-700">{errors.name}</p>
                      ) : null}
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                      />
                      {errors.password && touched.password ? (
                        <p className="text-xs text-red-700">
                          {errors.password}
                        </p>
                      ) : null}
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
