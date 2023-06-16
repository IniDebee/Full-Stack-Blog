import "./App.css";
// import { Link } from "react-router-dom";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Route,
} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Footer from "./components/Footer";
// import Hero from "./components/Hero";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
const Layout1 = () => {
  return (
    <>
      <Navbar2 />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  {
    path: "/write",
    element: <Layout1 />,
    children: [
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/post/:id",
    element: <Layout1 />,
    children: [
      {
        path: "/post/:id",
        element: <Single />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
