import { chains, solanaConfig } from "@/configurations/solana"
import { PROJECT_ID } from "@/configurations/web3modal"
import { createWeb3Modal } from "@web3modal/solana/react"
import {
    PhantomWalletAdapter,
    HuobiWalletAdapter,
    SolflareWalletAdapter,
    TrustWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack'

createWeb3Modal({
    solanaConfig,
    chains,
    projectId: PROJECT_ID,
    wallets: [
        new BackpackWalletAdapter(),
        new HuobiWalletAdapter(),
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new TrustWalletAdapter()
    ],
})
