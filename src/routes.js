import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import CreatePage from "./pages/CreatePage";

const routes = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/blogs",
    element: ListPage,
  },
  {
    path: "/blogs/create",
    element: CreatePage,
  },

  {
    path: "/blogs/edit",
    element: EditPage,
  },
];

export default routes;
