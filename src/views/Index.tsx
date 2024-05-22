import Divider from "@/components/Borders/Divider";
import IcoBalance from "@/components/Box/IcoBalance";
import IcoInfo from "@/components/Box/IcoInfo";
import Ico from "@/components/Form/Ico";
import Layout from "@/components/Layout/Main";
import { DEFAULT_ADDRESS } from "@/configurations/common";
import { AHA_SYMBOL, USDT_SYMBOL } from "@/configurations/contract";
import { OpenParams } from "@/types/account";
import { getTokenHolders } from "@/utils/bsc";
import { formattedBalance } from "@/utils/wagmi";
import { getAllowance } from "@/utils/wagmi/aha/readContract";
import { getTokenPrice, getTokenSold } from "@/utils/wagmi/ico/readContract";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { MouseEvent, useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";


export default function Index() {
    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    const [refetch, setRefetch] = useState<boolean>(false)
    const [ahaBalance, setAhaBalance] = useState<number>(0)
    const [usdtBalance, setUsdtBalance] = useState<number>(0)
    const [tokenHolders, setTokenHolders] = useState<number>(0)
    const [tokenPrice, setTokenPrice] = useState<BigInt>(BigInt(0))
    const [tokenSold, setTokenSold] = useState<BigInt>(BigInt(0))
    const [allowance, setAllowance] = useState<BigInt>(BigInt(0))

    const handleConnect = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        e.preventDefault();
        if (address) {
            open({ view: "Account" } as OpenParams);
        } else {
            open({ view: "Connect" } as OpenParams);
        }
    };

    
    useEffect(() => {
        (async () => {
            const price = await getTokenPrice(address || DEFAULT_ADDRESS as Address) as BigInt;
            const tokenSale = await getAllowance(address || DEFAULT_ADDRESS as Address) as BigInt;
            const sold = await getTokenSold(address || DEFAULT_ADDRESS as Address) as BigInt;
            const holder = await getTokenHolders();
            
            setTokenPrice(price)
            setAllowance(tokenSale)
            setTokenSold(sold)
            setTokenHolders(holder)
            setRefetch(false)
        })()
    }, [address, refetch])
    
    
    useEffect(() => {
        (async () => {
            const aha = await formattedBalance(address || DEFAULT_ADDRESS as Address, AHA_SYMBOL);
            const usdt = await formattedBalance(address || DEFAULT_ADDRESS as Address, USDT_SYMBOL);

            setAhaBalance(aha)
            setUsdtBalance(usdt)
        })()
    }, [isConnected, refetch])

    return (
        <Layout>
            <div className="flex justify-center">
                <section className="w-2/4 px-4 sm:px-10 py-10 space-y-5 bg-gray-300 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-30">
                    <IcoBalance usdt={usdtBalance} aha={ahaBalance} />
                    <Ico
                        address={address}
                        tokenPrice={tokenPrice}
                        handleConnect={handleConnect}
                        setRefetch={setRefetch}
                    />
                    <Divider />
                    <IcoInfo
                        allowance={allowance}
                        tokenSold={tokenSold}
                        tokenHolders={tokenHolders}
                    />
                </section>
            </div>
        </Layout>
    );
}