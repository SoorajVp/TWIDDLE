import { useSelector } from "react-redux";
import { RootState } from "../../../state/interface/userInterface";
import React, { useState } from "react";
import { userRequest } from "../../../api/requests/userRequest";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface stateType {
  setIsOpen: (value: boolean) => void;
}
interface ApiResponse {
  status: string;
  message: string;
}

const passwordSchema = Yup.object({
  password: Yup.string().min(5).max(15).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const initialValues: { password: string; confirmPassword: string } = {
  password: "",
  confirmPassword: "",
};

const PasswordForm: React.FC<stateType> = ({ setIsOpen }) => {
  const { darkMode } = useSelector((store: RootState) => store.user);
  const [confirmPage, setConfirmPage] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: passwordSchema,
      onSubmit: async (values) => {
        const response = (await userRequest.changePassword({
          password: values.password,
        })) as ApiResponse;
        console.log(response);
        if (response.status == "success") {
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
          });
          setIsOpen(false);
        } else {
          toast.error(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
          });
        }
      },
    });

  const HandleNextPage = async (): Promise<void> => {
    console.log("clicked -- - - - -");
    const response = (await userRequest.checkPassword(
      currentPassword
    )) as ApiResponse;
    console.log("password response ------", response);
    if (response.status == "success") {
      console.log("success");
      setConfirmPage(true);
    } else {
      console.log("erroror");
      setError(response.message);
    }
  };

  let color: string, bgColor: string;
  if (darkMode) {
    (color = "text-white"), (bgColor = "bg-gray-950");
  } else {
    (color = "text-gray-950"), (bgColor = "bg-white");
  }
  return (
    <div>
      <div className={`${color} ${bgColor} px-6 py-2 lg:px-2 w-96 -m-4`}>
        <form onSubmit={handleSubmit}>
          <div className=" sm:mx-auto sm:w-full sm:max-w-sm px-3 pb-2">
            <div className="flex justify-between pb-1">
              <button
                onClick={() => setIsOpen(false)}
                className={`${
                  darkMode
                    ? "bg-gray-900 text-gray-200 hover:bg-slate-800"
                    : "bg-gray-200 text-gray-900 hover:bg-slate-100"
                } justify-center rounded-sm px-5 py-1 text-sm font-semibold leading-6  hover:shadow-sm border   focus-visible:outline focus-visible:outline-2 `}
              >
                Cancel
              </button>
              <h2 className="text-center text-sm font-semibold pt-1.5">
                Change Password{" "}
              </h2>

              {!confirmPage ? (
                <button
                  type="button"
                  onClick={HandleNextPage}
                  className="justify-center rounded-sm bg-indigo-600 px-6 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="justify-center rounded-sm bg-indigo-600 px-6 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              )}
            </div>
            <hr />

            {!confirmPage ? (
              <div className="">
                <div className="text-center px-1 my-6">
                  <label
                    htmlFor="userName"
                    className={`${color} block text-sm font-medium leading-6`}
                  >
                    Enter your current password
                  </label>
                </div>

                <div className="mt-1">
                  <input
                    type="password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={`${
                      darkMode && "bg-gray-800 text-gray-200"
                    } pl-4 block w-full rounded-md border-0 py-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                  />
                </div>
                <p className="text-center text-red-800 text-xs pt-2">{error}</p>
              </div>
            ) : (
              <div>
                <div className="pt-6">
                  <div className="flex justify-center px-1">
                    <label
                      htmlFor="password"
                      className={`${color} block text-sm font-medium leading-6`}
                    >
                      New password
                    </label>
                  </div>

                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="text"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${
                        darkMode && "bg-gray-800 text-gray-200"
                      } pl-4 block w-full rounded-md border-0 py-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <p className="text-xs text-center text-red-700">
                      {errors.password}
                    </p>
                  ) : null}
                </div>

                <div className="pt-3 pb-6">
                  <div className="flex justify-center px-1">
                    <label
                      htmlFor="email"
                      className={`${color} block text-sm font-medium leading-6`}
                    >
                      Confirm password
                    </label>
                  </div>

                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${
                        darkMode && "bg-gray-800 text-gray-200"
                      } pl-4 block w-full rounded-md border-0 py-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="text-xs text-center text-red-700">
                      {errors.confirmPassword}
                    </p>
                  ) : null}
                </div>
              </div>
            )}

            {/* <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save Changes
              </button>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;
