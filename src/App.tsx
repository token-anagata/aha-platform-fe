import { Web3ModalProvider } from "./providers/web3modal"
import Index from "./views/Index"
import "./index.scss"
import { DarkModeProvider } from "./context/DarkModeContext"

function App() {

  return (
    <Web3ModalProvider>
      <DarkModeProvider>
        <Index />
      </DarkModeProvider>
    </Web3ModalProvider>
  )
}

export default App
