import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Toaster/>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};
export default App;
