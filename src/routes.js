import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import CreatePage from "./pages/CreatePage";
import ShowPage from "./pages/ShowPage";

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
  {
    path: "/blogs/:id",
    element: ShowPage,
  },
];

export default routes;
