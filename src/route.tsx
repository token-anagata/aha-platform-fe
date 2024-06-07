import { LoaderFunction, LoaderFunctionArgs, RouteObject, createBrowserRouter, redirect } from "react-router-dom";
import IcoPage from "./views/IcoPage";
import StakePage from "./views/StakePage";
import DonationPage from "./views/DonationPage";
import { WEBBASE_URL } from "./configurations/common";
//import { fetchAuthData } from "./hooks/useAuth";

const grabTokenLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if(token){
    localStorage.setItem('_X_AUTH_', token as string)

    return redirect('/')
  }

  window.location.replace(WEBBASE_URL) 
  return false
}

// const verifyAuthloader: LoaderFunction = async () => {
//   const res = await fetchAuthData()
//   console.log(res)
//   if (res) {
//     return true;
//   }

//   //window.location.replace(WEBBASE_URL) 
//   return true
// }

const routes: RouteObject[] = [
    {
      path: '/',
      //loader: verifyAuthloader,
      element: <IcoPage />,
    },
    {
      path: '/auth',
      loader: grabTokenLoader
    },
    {
      path: '/stake',
      //loader: verifyAuthloader,
      element: <StakePage />,
    },
    {
      path: '/donation/:id',
      //loader: verifyAuthloader,
      element: <DonationPage />,
    },
  ];
  
  const router = createBrowserRouter(routes);
  
  export default router;