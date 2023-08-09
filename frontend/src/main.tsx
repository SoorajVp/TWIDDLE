import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./state/store.ts";
import { persistStore } from "redux-persist";
import "./index.css";
import { ToastContainer } from "react-toastify";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <>
    <ToastContainer />

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>

);
