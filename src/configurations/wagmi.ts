import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { http } from '@wagmi/core';
import { getChainNetwork } from "./chains";
import { Chain } from "viem";

interface Metadata {
  name: string;
  description: string;
  url: string;
  icons: string[];
}

const metadata: Metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID as string;
const chain = getChainNetwork();

export const config = defaultWagmiConfig({
  chains: [chain] as [Chain],
  projectId,
  metadata,
  transports: {
    [chain.id]: http(),
  },
  // Uncomment and specify wagmiOptions if needed
  // ...wagmiOptions 
});
