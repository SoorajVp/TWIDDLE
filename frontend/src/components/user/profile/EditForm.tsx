/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiCalls } from "../../../api/user/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../state/slices/userSlice";
import { toast } from "react-toastify";
import {
  AuthResponse,
  RootState,
} from "../../../state/interface/userInterface";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../../shimmer/Loading";

const loginSchema = Yup.object({
  name: Yup.string().min(4).max(15).required("Please enter your username "),
  bio: Yup.string(),
  email: Yup.string().email().required("Please enter your username "),
});

const EditForm = ({ setIsOpen }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((store: RootState) => store.user);
  const initialValues: { name: string; bio: string; email: string } = {
    name: user.name,
    bio: user.bio,
    email: user.email,
  };

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        setLoading(true)
        const {
          name,
          bio,
          email,
        }: { name: string; bio: string | null; email: string } = values;
        const userData = { name, bio, email };

        const response: AuthResponse = await apiCalls.updateProfile(userData);
        if (response.status == "success") {
          const { user } = response;
          dispatch(updateUser({ user: user }));
          navigate(`/${user.name}`);
          setIsOpen(false);
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
          });
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
    { loading && <Loading /> }

      <div className=" px-6 py-2 lg:px-2 w-96 -m-4 ">
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm px-3 pb-2">
          <form className="space-y-1" onSubmit={handleSubmit}>

          <div className="flex justify-between pb-1">
          <button
                onClick={()=> setIsOpen(false)}
                className="justify-center rounded-sm bg-gray-200 px-5 py-1 text-sm font-semibold leading-6 text-gray-900 hover:shadow-sm border hover:bg-slate-100  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="justify-center rounded-sm bg-indigo-600 px-6 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
            <hr/>

            <div className="sm:mx-auto pt-1 sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-auto w-32 rounded-full border"
                src={user.profilePic}
                alt="Your Company"
              />
              <h2 className="text-center text-xs font-bold leading-9 tracking-tight text-gray-900">
                Change profile photo
              </h2>
            </div>
            <div className="">
              <div className="flex justify-between px-1">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  UserName
                </label>
                <div className="text-sm">
                  <div className="font-medium text-indigo-600 hover:text-indigo-500">
                    Edit
                  </div>
                </div>
              </div>

              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-4 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && touched.name ? (
                  <p className="text-xs text-center text-red-700">
                    {errors.name}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="pt-3">
              <div className="flex justify-between px-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Bio
                </label>
                <div className="text-sm">
                  <div className="font-medium text-indigo-600 hover:text-indigo-500">
                    Edit
                  </div>
                </div>
              </div>

              <div className="mt-1">
                <input
                  id="bio"
                  name="bio"
                  type="text"
                  value={values.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-4 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.bio && touched.bio ? (
                  <p className="text-xs text-center text-red-700">
                    {errors.bio}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="pt-3">
              <div className="flex justify-between px-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  email
                </label>
                <div className="text-sm">
                  <div className="font-medium text-indigo-600 hover:text-indigo-500">
                    Edit
                  </div>
                </div>
              </div>

              <div className="mt-1">
                <input
                  id="enail"
                  name="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-4 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && touched.email ? (
                  <p className="text-xs text-center text-red-700">
                    {errors.name}
                  </p>
                ) : null}
              </div>
            </div>

            {/* <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save Changes
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
