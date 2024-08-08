import Divider from "@/components/Borders/Divider";
import IcoBalance from "@/components/Box/BaseBalance";
import IcoInfo from "@/components/Box/IcoInfo";
import GasFee from "@/components/Description/GasFee";
import Ico from "@/components/Form/Ico";
import Layout from "@/components/Layout/Main";
import ModalInfo from "@/components/Modal/ModalInfo";
import { getBscChainNetwork } from "@/configurations/chains";
import { DEFAULT_ADDRESS } from "@/configurations/common";
import { AHA_SYMBOL, USDT_SYMBOL } from "@/configurations/contract";
import { useStore } from "@/context/StoreContext";
import { RangePrice } from "@/types/token";
//import { getTokenHolders } from "@/utils/bsc";
import { formattedBalance } from "@/utils/wagmi";
import { getAllowance } from "@/utils/wagmi/aha/readContract";
import { getMaxAmount, getMinAmount, getTokenPrice, getTokenSold } from "@/utils/wagmi/ico/readContract";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

const bscChain = getBscChainNetwork()

const IcoPage: React.FC = () => {
    const { address, isConnected, status } = useAccount();
    const [refetch, setRefetch] = useState<boolean>(false)
    const [ahaBalance, setAhaBalance] = useState<number>(0)
    const [usdtBalance, setUsdtBalance] = useState<number>(0)
    const [tokenPrice, setTokenPrice] = useState<BigInt>(BigInt(0))
    const [tokenSold, setTokenSold] = useState<BigInt>(BigInt(0))
    //const [tokenHolders, setTokenHolders] = useState<number>(0)
    const [rangePrice, setRangePrice] = useState<RangePrice>({ min: BigInt(0), max: BigInt(0) })
    const [allowance, setAllowance] = useState<BigInt>(BigInt(0))
    const { gasInfoIco, setGasInfoIco } = useStore();
    const { switchChainAsync } = useSwitchChain();
    const chainId = useChainId()
    const closeModal = () => setGasInfoIco(false);

    useEffect(() => {
        (async () => {
            if (chainId !== bscChain.id) {
                await switchChainAsync({ chainId: bscChain.id });
            } 
        })()
    }, [status])

    useEffect(() => {
        if (chainId !== bscChain.id) return
        (async () => {
            const price = await getTokenPrice(address || DEFAULT_ADDRESS as Address) as BigInt;
            const min = await getMinAmount(address || DEFAULT_ADDRESS as Address) as BigInt;
            const max = await getMaxAmount(address || DEFAULT_ADDRESS as Address) as BigInt;
            const tokenSale = await getAllowance(address || DEFAULT_ADDRESS as Address) as BigInt;
            const sold = await getTokenSold(address || DEFAULT_ADDRESS as Address) as BigInt;
            //const holder = await getTokenHolders();

            setTokenPrice(price)
            setRangePrice({ min, max })
            setAllowance(tokenSale)
            setTokenSold(sold)
            //setTokenHolders(holder)
            setRefetch(false)
        })()
    }, [address, refetch])


    useEffect(() => {
        if (chainId !== bscChain.id) return
        (async () => {
            const aha = await formattedBalance(address || DEFAULT_ADDRESS as Address, AHA_SYMBOL);
            const usdt = await formattedBalance(address || DEFAULT_ADDRESS as Address, USDT_SYMBOL);

            setAhaBalance(aha)
            setUsdtBalance(usdt)
        })()
    }, [isConnected, refetch])

    return (
        <Layout type="default">
            <div className="flex justify-center">
                <section className="w-full md:w-2/4 px-4 sm:px-10 py-10 md:space-y-5 bg-gray-300 dark:bg-gray-50 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-40">
                    <IcoBalance page="ico" usdt={usdtBalance} aha={ahaBalance} />
                    <Ico
                        address={address}
                        tokenPrice={tokenPrice}
                        rangePrice={rangePrice}
                        setRefetch={setRefetch}
                    />
                    <Divider />
                    <IcoInfo
                        allowance={allowance}
                        tokenSold={tokenSold}
                    />

                    <ModalInfo
                        isOpen={gasInfoIco}
                        onClose={closeModal}
                        title="Gas Fees"
                        closeText="I understand"
                    >
                        <GasFee />
                    </ModalInfo>
                </section>
            </div>
        </Layout>
    );
}


export default IcoPage