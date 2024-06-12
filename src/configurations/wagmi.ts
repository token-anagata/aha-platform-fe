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
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
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