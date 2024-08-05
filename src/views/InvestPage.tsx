import SpinIcon from "@/assets/svg/SpinIcon";
import BaseBalance from "@/components/Box/BaseBalance";
import ListInvest from "@/components/Box/ListInvest";
import CardInvest from "@/components/Card/CardInvest";
import GasFee from "@/components/Description/GasFee";
import Invest from "@/components/Form/Invest";
import Layout from "@/components/Layout/Main";
import ModalInfo from "@/components/Modal/ModalInfo";
import { getBscChainNetwork } from "@/configurations/chains";
import { AHA_SYMBOL, USDT_SYMBOL } from "@/configurations/contract";
import { useStore } from "@/context/StoreContext";
import { useProjectInvest } from "@/hooks/useProject";
import { formattedBalance } from "@/utils/wagmi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Address } from "viem";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

const bscChain = getBscChainNetwork()

const InvestPage: React.FC = () => {
    const { address, isConnected, status } = useAccount();
    const [refetch, setRefetch] = useState<boolean>(false);
    const { gasInfoInvest, setGasInfoInvest } = useStore();
    //const [tokenPrice, setTokenPrice] = useState<BigInt>(BigInt(0));
    const [ahaBalance, setAhaBalance] = useState<number>(0)
    const [usdtBalance, setUsdtBalance] = useState<number>(0)
    const { id } = useParams();
    const { data: dataProject, isError } = useProjectInvest(id as string)
    const { switchChainAsync } = useSwitchChain();
    const chainId = useChainId()
    const navigate = useNavigate()

    const closeModal = () => setGasInfoInvest(false);

    useEffect(() => {
        if (isError || dataProject === null) navigate('/not-found');
    }, [dataProject, isError])
    
    useEffect(() => {
        (async () => {
            if (chainId !== bscChain.id) {
                await switchChainAsync({ chainId: bscChain.id });
            }
            setRefetch(true)
        })()
    }, [chainId, status, isConnected])

    // useEffect(() => {
    //     if (chainId !== bscChain.id) return
    //     (async () => {
    //         const price = await getTokenPrice(address || DEFAULT_ADDRESS as Address) as BigInt;

    //         setTokenPrice(price)
    //         setRefetch(false)
    //     })()
    // }, [address, refetch])

    useEffect(() => {
        if (chainId !== bscChain.id) return
        (async () => {
            const aha = await formattedBalance(address as Address, AHA_SYMBOL);
            const usdt = await formattedBalance(address as Address, USDT_SYMBOL);

            setAhaBalance(aha)
            setUsdtBalance(usdt)
        })()
    }, [isConnected, refetch])
    
    if (dataProject == null || dataProject == undefined) {
        return (
            <div className="flex min-h-screen justify-center items-center place-self-center">
                <SpinIcon addClassName="animate-spin w-32 h-32 text-aha-green-light" />
            </div>
        );
    }

    return (
        <Layout type="default">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <section className="w-full md:w-2/4 px-4 py-2 md:space-y-5 bg-gray-100 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-30">
                    <CardInvest
                        data={dataProject}
                    />
                </section>
                <section className="w-full md:w-2/4 px-4 sm:px-10 py-10 md:space-y-5 bg-gray-300 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-30">
                    <BaseBalance page="invest" usdt={usdtBalance} aha={ahaBalance} />
                    <Invest
                        id={dataProject?.project_id as string}
                        address={address}
                        data={dataProject}
                        setRefetch={setRefetch}
                    />

                    <ModalInfo
                        isOpen={gasInfoInvest}
                        onClose={closeModal}
                        title="Gas Fees"
                        closeText="I understand"
                    >
                        <GasFee />
                    </ModalInfo>
                </section>
            </div>
            <div className="grid max-w-screen-xl mt-8">

                {/** List donate */}
                <ListInvest
                    id={dataProject?.slug as string}
                    address={address}
                    data={dataProject}
                    refetch={refetch}
                    setRefetch={setRefetch}
                />
            </div>
        </Layout>
    );
}


export default InvestPage