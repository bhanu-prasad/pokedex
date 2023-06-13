import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Search from "./components/search";
import Root from "./components/Root";
import Listing from "./components/Listing";
import Bookmarks from "./components/Bookmarks";
import Details from "./components/Details";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Search />,
      },
      {
        path: "/list",
        element: <Listing />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/details/:pokemon",
        element: <Details />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
