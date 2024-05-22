import { ReactNode } from 'react';
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/configurations/wagmi";

const queryClient = new QueryClient();

createWeb3Modal({
    wagmiConfig: config,
    projectId: import.meta.env.VITE_WEB3MODAL_PROJECT_ID as string,
    enableAnalytics: true,
    enableOnramp: false
});

interface Web3ModalProviderProps {
    children: ReactNode;
}

export function Web3ModalProvider({ children }: Web3ModalProviderProps): JSX.Element {
    return (
        <WagmiProvider config={config} >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
