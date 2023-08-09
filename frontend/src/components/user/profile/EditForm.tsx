/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import React, { useRef, useState } from "react";
import Loading from "../../shimmer/Loading";

const loginSchema = Yup.object({
  name: Yup.string().min(4).max(15).required("Please enter your name ").matches(/^[a-zA-Z0-9]+$/, '* This field cannot contain white space and special character'),
  bio: Yup.string().max(35),
  email: Yup.string().email().required("Please enter your username "),
});

interface stateType {
  setIsOpen: (value: boolean) => void;
}

const EditForm: React.FC<stateType> = ({ setIsOpen }: any ) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<Blob>(null)
  const { user, darkMode } = useSelector((store: RootState) => store.user);
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
        setLoading(true);
        const {
          name,
          bio,
          email,
        }: { name: string; bio: string | null; email: string } = values;
        // const userData = { name, bio, email };
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);
        formData.append("email", email);
        formData.append("key", user.profilePic);


        if(image) {
          formData.append("profilePic", image);
        }

        const response: AuthResponse = await apiCalls.updateProfile(formData);
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
          setLoading(false)
        }
      },
    });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files[0];
  //   console.log("this is image details - - - - -", files );
  //   const formData = new FormData();
  //   formData.append("profilePic", files);
  // };

  console.log("this is selected image --------", image)


  let color: string, bgColor: string;
  if (darkMode) {
    (color = "text-white"),
      (bgColor = "bg-gray-950")
  } else {
    (color = "text-gray-900"),
      (bgColor = "bg-white")
  }

  return (
    <div>

      {loading && <Loading />}

      <div className={`${color} ${bgColor} px-6 py-2 lg:px-2 w-96 -m-4`}>
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm px-3 pb-2">
          <form className="space-y-1" onSubmit={handleSubmit}>
            <div className="flex justify-between pb-1">
              <button
                onClick={() => setIsOpen(false)}
                className={`${darkMode ? "bg-gray-900 text-gray-200 hover:bg-slate-800" :"bg-gray-200 text-gray-900 hover:bg-slate-100"} justify-center rounded-sm px-5 py-1 text-sm font-semibold leading-6  hover:shadow-sm border   focus-visible:outline focus-visible:outline-2 `}
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
            <hr />

            <div className="sm:mx-auto pt-1 sm:w-full sm:max-w-sm">
            {image ?
            <img
                className="mx-auto object-cover h-32 w-32 rounded-full border"
                src={URL.createObjectURL(image)}
                alt="Your Company"
              /> :
              <img
                className="mx-auto h-auto w-32 rounded-full border"
                src={user.profilePic}
                alt="Your Company"
              /> }
              
            </div>
            <h2 className={`${color} text-center text-xs font-bold`}>
                <p className="bg-gray-500 shadow-md text-xs text-white border rounded-3xl inline-block py-0.5 px-3 cursor-pointer" onClick={handleButtonClick}>Change profile</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => setImage(e.target.files?.[0])}
                  />
              </h2>
            <div className="">
              <div className="flex justify-between px-1">
                <label
                  htmlFor="userName"
                  className={`${color} block text-sm font-medium leading-6`}
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
                  className={`${darkMode && "bg-gray-800 text-gray-200"} pl-4 block w-full rounded-md border-0 py-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
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
                  className={`${color} block text-sm font-medium leading-6`}
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
                  className={`${darkMode && "bg-gray-800 text-gray-200"} pl-4 block w-full rounded-md border-0 py-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
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
                  className={`${color} block text-sm font-medium leading-6`}
                >
                  Email
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
                  className={`${darkMode && "bg-gray-800 text-gray-200"} pl-4 block w-full rounded-md border-0 py-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                />
                {errors.email && touched.email ? (
                  <p className="text-xs text-center text-red-700">
                    {errors.name}
                  </p>
                ) : null}
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
