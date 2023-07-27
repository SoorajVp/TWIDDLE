// // import React from 'react'
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { useEffect } from "react";

// export const ToastMessage: React.FC<{ data: string }> = ({ data }) => {
//   toast.success("Successfully submitted !", {
//     position: toast.POSITION.TOP_RIGHT,
//   });
//   return <ToastContainer />;
// };

// const AlertMessage: React.FC<{ data: string }> = ({ data }) => {
//   useEffect(() => {
//     if (localStorage.getItem("alert")) {
//       setTimeout(() => {
//         localStorage.removeItem("alert");
//       }, 3000);
//     }
//   }, []);
//   return (
//     <>
//       <div className="fixed top-0 right-0 m-4 shadow-md">
//         <div
//           className="bg-red-100 border flex border-red-400 text-red-700 px-4 py-3 rounded relative"
//           role="alert"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="h-5 w-5"
//           >
//             <path
//               fill-rule="evenodd"
//               d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
//               clip-rule="evenodd"
//             />
//           </svg>
//           <span className="block sm:inline">{data}</span>
//           <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
//             <svg
//               className="fill-current h-6 w-6 text-red-500"
//               role="button"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//             >
//               <title>Close</title>
//               <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
//             </svg>
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AlertMessage;
