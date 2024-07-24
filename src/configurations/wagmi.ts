import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { getNetworkEnviroment, getTransportChain } from "./chains";
import { Chain } from "viem";
import { PROJECT_ID, metadata } from "./web3modal";

export const configWagmi = () => {
  const env = getNetworkEnviroment();
  const transport = getTransportChain()

  return defaultWagmiConfig({
    chains: env as [Chain, ...Chain[]],
    projectId: PROJECT_ID,
    metadata: metadata,
    transports: transport,
    // Uncomment and specify wagmiOptions if needed
    // ...wagmiOptions 
  });
} 

export const config = configWagmi()