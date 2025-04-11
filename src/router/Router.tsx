import { createBrowserRouter } from "react-router-dom";
import Root from "../components/layout/Root";
import Home from "../pages/Home";
import About from "../pages/About";
import Error from "../pages/Error";
import Articles from "../pages/Articles";
import Activities from "../pages/Activities";
import Contact from "../pages/Contact";
import Login from "../pages/admin/login/Login";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import PrivateRoute from "../private/PrivateRoute";
import Events from "../pages/admin/dashboard/events/Events";
import Sessions from "../pages/admin/dashboard/sessions/Sessions";
import Projects from "../pages/admin/dashboard/projects/Projects";
import DashboardArticles from "../pages/admin/dashboard/articles/Articles";
import DashboardExecutives from "../pages/admin/dashboard/executives/Executives";
import DashboardHome from "../pages/admin/dashboard/home/DashboardHome";
import ArticleDetails from "../pages/ArticleDetails";
import CommitteeList from "../pages/admin/dashboard/addSession/CommitteeList";
import Committee from "../pages/Committee";
import Developers from "../pages/Developers";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/articles/:id",
        element: <ArticleDetails />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/committee",
        element: <Committee />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/developers",
        element: <Developers />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "admin/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/dashboard/events",
        element: (
          <PrivateRoute>
            <Events />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/dashboard/sessions",
        element: (
          <PrivateRoute>
            <Sessions />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/dashboard/projects",
        element: (
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/dashboard/articles",
        element: (
          <PrivateRoute>
            <DashboardArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/dashboard/executives",
        element: (
          <PrivateRoute>
            <DashboardExecutives />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/dashboard/committee",
        element: (
          <PrivateRoute>
            <CommitteeList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
