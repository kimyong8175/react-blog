import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import CreatePage from "./pages/CreatePage";
import ShowPage from "./pages/ShowPage";
import AdminPage from "./pages/AdminPage";

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
    path: "/admin",
    element: AdminPage,
    auth: true,
  },
  {
    path: "/blogs/create",
    element: CreatePage,
    auth: true,
  },
  {
    path: "/blogs/:id/edit",
    element: EditPage,
    auth: true,
  },
  {
    path: "/blogs/:id",
    element: ShowPage,
  },
];

export default routes;
