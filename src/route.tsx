import { RouteObject, createBrowserRouter } from "react-router-dom";
import IcoPage from "./views/IcoPage";
import StakePage from "./views/StakePage";
import GrabPage from "./views/GrabPage";

const routes: RouteObject[] = [
    {
      path: '/',
      element: <IcoPage />,
    },
    {
      path: '/app-auth',
      element: <GrabPage />,
    },
    {
      path: '/stake',
      element: <StakePage />,
    },
  ];
  
  const router = createBrowserRouter(routes);
  
  export default router;