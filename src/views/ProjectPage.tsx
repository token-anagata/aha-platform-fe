import Balance from "@/components/Box/Balance";
import Project from "@/components/Form/Project";
import Layout from "@/components/Layout/Main";
import { getBscChainNetwork } from "@/configurations/chains";
import { DEFAULT_ADDRESS } from "@/configurations/common";
import { useProject } from "@/hooks/useProject";
import { OpenParams } from "@/types/account";
import { formattedMainBalance } from "@/utils/wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import React, { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Address } from "viem";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

const bscChain = getBscChainNetwork()

const ProjectPage: React.FC = () => {
    const { open } = useWeb3Modal();
    const { address, isConnected, status } = useAccount();
    const [refetch, setRefetch] = useState<boolean>(false)
    const [bnbBalance, setBnbBalance] = useState<number>(0)
    const { id } = useParams();
    const { data: dataProject, isError } = useProject(id as string)
    const { switchChainAsync } = useSwitchChain();
    const chainId = useChainId()
    const navigate = useNavigate()

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
            if (chainId !== bscChain.id) {
                await switchChainAsync({ chainId: bscChain.id });
            } 
        })()
    }, [status])

    useEffect(() => {
        if (isError || dataProject === null) navigate('/not-found');
    }, [dataProject, isError])

    useEffect(() => {
        if (chainId !== bscChain.id) return
        (async () => {
            const bnb = await formattedMainBalance(address || DEFAULT_ADDRESS as Address);

            setBnbBalance(bnb)
        })()
    }, [isConnected, refetch])

    return (
        <Layout type="default">
            <div className="flex justify-center">
                <section className="w-full md:w-2/4 px-4 sm:px-10 py-10 md:space-y-5 bg-gray-300 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-30">
                    <Balance page="project" title="Post on Smartcontract" bnb={bnbBalance} />
                    <Project
                        id={dataProject?.project_id as string}
                        address={address}
                        data={dataProject}
                        handleConnect={handleConnect}
                        setRefetch={setRefetch}
                    />
                </section>
            </div>
        </Layout>
    );
}


export default ProjectPage