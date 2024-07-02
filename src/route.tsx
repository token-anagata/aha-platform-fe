import { LoaderFunction, LoaderFunctionArgs, RouteObject, createBrowserRouter } from "react-router-dom";
import IcoPage from "./views/IcoPage";
import StakePage from "./views/StakePage";
import DonationPage from "./views/DonationPage";
import { WEBBASE_URL } from "./configurations/common";
import ErrorPage from "./views/error/ErrorPage";
import NotFound from "./views/error/NotFound";
import { fetchAuthData } from "./hooks/useAuth";
import InvestPage from "./views/InvestPage";

const grabTokenLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (token) {
    localStorage.setItem('_X_AUTH_', token as string)

    window.location.replace(`${WEBBASE_URL}/dashboard`)
    return false
  }
  
  window.location.replace(WEBBASE_URL)
  return false
}

const verifyAuthloader: LoaderFunction = async () => {
  const res = await fetchAuthData()
  console.log(res)
  if (res) {
    return true;
  }

  //window.location.replace(WEBBASE_URL) 
  return true
}

const routes: RouteObject[] = [
  {
    path: '/',
    loader: verifyAuthloader,
    element: <IcoPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/auth',
    loader: grabTokenLoader,
    errorElement: <ErrorPage />
  },
  {
    path: '/stake',
    loader: verifyAuthloader,
    element: <StakePage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/donation/:id',
    loader: verifyAuthloader,
    element: <DonationPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/invest/:id',
    loader: verifyAuthloader,
    element: <InvestPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '*', 
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;