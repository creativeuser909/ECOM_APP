import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import SignUp from "../pages/SignUp";
import Logout from "../pages/Logout";
import AdminPanel from "../pages/AdminPanel";
import CategroyProducts from "../pages/CategroyProducts";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children : [
            {
                path : "",
                element : <Home />
            },
            {
                path : "login",
                element : <Login />
            },
            {
                path : "forget-password",
                element : <ForgetPassword />
            },
            {
                path : "sign-up",
                element : <SignUp />
            },
            {
                path : "logout",
                element : <Logout />
            },
            {
                path : "admin",
                element : <AdminPanel />
            },
            {
                path: "category/:categoryName",
                element: <CategroyProducts />
            }

        ]
    }
])

export default Routes