import BaseBalance from "@/components/Box/BaseBalance";
import CardInvest from "@/components/Card/CardInvest";
import GasFee from "@/components/Description/GasFee";
import Invest from "@/components/Form/Invest";
import Layout from "@/components/Layout/Main";
import ModalInfo from "@/components/Modal/ModalInfo";
import { getBscChainNetwork } from "@/configurations/chains";
import { DEFAULT_ADDRESS } from "@/configurations/common";
import { AHA_SYMBOL, USDT_SYMBOL } from "@/configurations/contract";
import { useStore } from "@/context/StoreContext";
import { useProject } from "@/hooks/useProject";
import { OpenParams } from "@/types/account";
import { formattedBalance } from "@/utils/wagmi";
import { getProject } from "@/utils/wagmi/contribute/readContract";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import React, { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Address } from "viem";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

const bscChain = getBscChainNetwork()

const InvestPage: React.FC = () => {
    const { open } = useWeb3Modal();
    const { address, isConnected, status } = useAccount();
    const [refetch, setRefetch] = useState<boolean>(false);
    const { gasInfoInvest, setGasInfoInvest } = useStore();
    //const [tokenPrice, setTokenPrice] = useState<BigInt>(BigInt(0));
    const [ahaBalance, setAhaBalance] = useState<number>(0)
    const [usdtBalance, setUsdtBalance] = useState<number>(0)
    const [project, setProject] = useState<number[]>([])
    const { id } = useParams();
    const { data: dataProject, isError } = useProject(id as string)
    const { switchChainAsync } = useSwitchChain();
    const chainId = useChainId()
    const navigate = useNavigate()

    const closeModal = () => setGasInfoInvest(false);

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
            if (dataProject !== null && dataProject !== undefined){   
                const data = await getProject(address || DEFAULT_ADDRESS as Address, dataProject?.project_id as string);
    
                setProject(data as number[])
            } 
        })()
        
        if (isError || dataProject === null) navigate('/not-found');
    }, [dataProject, isError])

    useEffect(() => {
        (async () => {
            if (chainId !== bscChain.id) {
                await switchChainAsync({ chainId: bscChain.id });
            } 
        })()
    }, [status])

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
                        project={project}
                        handleConnect={handleConnect}
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
        </Layout>
    );
}


export default InvestPage