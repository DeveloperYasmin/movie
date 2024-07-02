import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./app/store";
import Home from "./components/Home";
import AddEditMovie from "./components/AddEditMovie";
import MovieDetails from "./components/MovieDetails";

function App(){
const AppLayout = () => (
  <Provider store={appStore}>
    <div className="select-none">
      <Outlet />
    </div>
  </Provider>
);

const appRouter = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add",
        element: <AddEditMovie />,
      },
      {
        path: "/edit/:id",
        element: <AddEditMovie />,
      },
      {
        path: "/details/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);



// Render the App component
ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={appRouter}/>);
}
export default App