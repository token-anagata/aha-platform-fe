import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { getNetworkEnviroment, getTransportChain } from "./chains";
import { Chain } from "viem";

interface Metadata {
  name: string;
  description: string;
  url: string;
  icons: string[];
}

const PROJECT_ID = import.meta.env.VITE_WEB3MODAL_PROJECT_ID as string;

const metadata: Metadata = {
  name: 'AHA Web3Modal',
  description: 'AHA Wallet Modal',
  url: 'https://project-anagata.io',
  icons: ['https://project-anagata.io/img/AHAWhite.png']
};

export const configWagmi = () => {
  const env = getNetworkEnviroment();
  const transport = getTransportChain()

  return defaultWagmiConfig({
    chains: env as [Chain, ...Chain[]],
    projectId: PROJECT_ID,
    metadata,
    transports: transport,
    // Uncomment and specify wagmiOptions if needed
    // ...wagmiOptions 
  });
} 

export const config = configWagmi()