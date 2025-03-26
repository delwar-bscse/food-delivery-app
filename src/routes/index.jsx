import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/Auth/Login";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";

import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Users";
import User from "../Pages/Dashboard/User";
import OrderManagement from "../Pages/Dashboard/OrderManagement";
import OrderDetails from "../Pages/Dashboard/OrderDetails";
import Analytics from "../Pages/Dashboard/Analytics";
import Subscriptions from "../Pages/Dashboard/Subscriptions";
import ViewRequest from "../Pages/Dashboard/ViewRequest";
import Announcements from "../Pages/Dashboard/Announcements";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition";
import NotFound from "../NotFound";
import CreateSubscription from "../Pages/Dashboard/CreateSubscription";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:id",
        element: <User />,
      },
      {
        path: "/orders",
        element: <OrderManagement />,
      },
      {
        path: "/orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "/view-reports",
        element: <ViewRequest />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/announcements",
        element: <Announcements />,
      },
      {
        path: "/subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "/subscriptions/create",
        element: <CreateSubscription />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndCondition />,
      },
      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
