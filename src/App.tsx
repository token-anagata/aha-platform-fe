import { Web3ModalProvider } from "./providers/web3modal"
import "./index.scss"
import { DarkModeProvider } from "./context/DarkModeContext"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import router from "./route";
import { AccountStakedProvider } from "./context/AccountStakedContext";

function App() {

  return (
    <Web3ModalProvider>
      <AccountStakedProvider>
        <DarkModeProvider>
          <ToastContainer position="bottom-left" theme="colored" />
          <RouterProvider router={router} />
        </DarkModeProvider>
      </AccountStakedProvider>
    </Web3ModalProvider>
  )
}

export default App
