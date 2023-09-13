import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/appRouter";
import { useEffect } from "react";
import { socket } from "./socket";
import { toast } from "react-toastify";

const App = () => {

  useEffect(() => {
    socket.on("receive-notification", (notification) => {
      console.log("receiving notification", notification)

      toast.info(notification.text, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        icon: null,
      });
    });
  }, []);

  return (
      <RouterProvider router={appRouter} />
  );
}

export default App;
