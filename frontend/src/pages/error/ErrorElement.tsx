import { Link, useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const { statusText, status } = useRouteError() as {
    statusText: string;
    status: number;
  };

  
  return (
    <section className="bg-white ">
      <div className="container flex justify-center min-h-screen px-6 pt-5 mx-auto">
        <div>

          <div className="flex justify-center items-center w-full">
            <img className="" width="330px" src="../../../../public/search-image.png" alt="Loading" />
          </div>

          <p className="text-lg font-medium text-red-500"> <span className="text-5xl text-blue-500 font-bold pr-2">{status ?? 404}</span> {statusText ?? "Not Found"}</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">We can’t find that page</h1>
          <p className="mt-4 text-gray-500 ">Sorry, the page you are looking for doesn't exist or has been moved.</p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link to="/" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-blue-700 transition duration-300 ease-in bg-white border border-blue-500 rounded-lg gap-x-2 sm:w-auto hover:text-white hover:bg-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>

              <span>Go back</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorElement;
