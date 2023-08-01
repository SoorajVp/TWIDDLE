import { useFormik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object({
    name: Yup.string().min(4).max(15).required("Please enter your username "),
    bio: Yup.string(),
  email: Yup.string().email().required("Please enter your username "),

  });
  
  const initialValues: { name: string; bio: string, email: string } = {
    name: "",
    bio: "",
    email: ""
  };

const EditForm = () => {

    const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        const { name, bio, email }: { name: string; bio: string | null, email: string } = values;
        console.log(name, bio, email )
       
      },
    });

  return (
    <div>
        <div className=" px-6 py-3 lg:px-2 w-96">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-auto w-32 rounded-full"
              src="https://file.xunruicms.com/admin_html/assets/pages/media/profile/profile_user.jpg"
              alt="Your Company"
            />
            <h2 className="text-center text-xs font-bold leading-9 tracking-tight text-gray-900">
              Change profile photo
            </h2>
          </div>

          <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <div className="flex justify-between">
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
                <p className="text-xs text-center text-red-700">{errors.name}</p>
              ) : null}
                </div>
              </div>

              <div>
                <div className="flex justify-between">
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
                <p className="text-xs text-center text-red-700">{errors.bio}</p>
              ) : null}
                </div>
              </div>


              <div>
                <div className="flex justify-between">
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
                <p className="text-xs text-center text-red-700">{errors.name}</p>
              ) : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
    </div>
  )
}

export default EditForm