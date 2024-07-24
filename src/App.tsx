import { Web3ModalProvider } from "./providers/Web3Modal"
import "./index.scss"
import { DarkModeProvider } from "./context/DarkModeContext"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import router from "./route";
import { AccountStakedProvider } from "./context/AccountStakedContext";
import { StoreProvider } from "./context/StoreContext";
import WalletContextProvider from "./providers/WalletContextProvider";
import { AccountProvider } from "./context/AccountContext";

function App() {

  return (
    <Web3ModalProvider>
      <WalletContextProvider>
        <AccountProvider>
          <AccountStakedProvider>
            <DarkModeProvider>
              <StoreProvider>
                <ToastContainer position="bottom-left" theme="colored" />
                <RouterProvider router={router} />
              </StoreProvider>
            </DarkModeProvider>
          </AccountStakedProvider>
        </AccountProvider>
      </WalletContextProvider>
    </Web3ModalProvider>
  )
}

export default App
