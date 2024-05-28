import { Web3ModalProvider } from "./providers/web3modal"
import Index from "./views/Index"
import "./index.scss"
import { DarkModeProvider } from "./context/DarkModeContext"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Web3ModalProvider>
      <DarkModeProvider>
        <ToastContainer position="bottom-left" theme="colored" />
        <Index />
      </DarkModeProvider>
    </Web3ModalProvider>
  )
}

export default App
