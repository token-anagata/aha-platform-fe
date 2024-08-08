import SpinIcon from "@/assets/svg/SpinIcon";
import Allocate from "@/components/Box/Allocate";
import Balance from "@/components/Box/Balance";
import MinimumContribute from "@/components/Form/MinimumContribute";
import Project from "@/components/Form/Project";
import ProjectStatus from "@/components/Form/ProjectStatus";
import Layout from "@/components/Layout/Main";
import { getBscChainNetwork } from "@/configurations/chains";
import { DEFAULT_ADDRESS } from "@/configurations/common";
import { useProjectInvest } from "@/hooks/useProject";
import { formattedMainBalance } from "@/utils/wagmi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Address } from "viem";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

const bscChain = getBscChainNetwork()

const ProjectPage: React.FC = () => {
    const { address, isConnected, status } = useAccount();
    const [refetch, setRefetch] = useState<boolean>(false)
    const [bnbBalance, setBnbBalance] = useState<number>(0)
    const { id } = useParams();
    const { data: dataProject, isError } = useProjectInvest(id as string)
    const { switchChainAsync } = useSwitchChain();
    const chainId = useChainId()
    const navigate = useNavigate()

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

    if (dataProject == null || dataProject == undefined) {
        return (
            <div className="flex min-h-screen justify-center items-center place-self-center">
                <SpinIcon addClassName="animate-spin w-32 h-32 text-aha-green-light" />
            </div>
        );
    }

    return (
        <Layout type="default">
            <div className="flex flex-col md:flex-row justify-center gap-4">
                <section className="w-full md:w-2/4 px-4 sm:px-10 py-10 md:space-y-5 bg-gray-300 dark:bg-gray-50 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-40">
                    <Balance page="project" title="Post on Smartcontract" bnb={bnbBalance} />
                    <Project
                        id={dataProject?.project_id as string}
                        address={address}
                        data={dataProject}
                        setRefetch={setRefetch}
                    />
                </section>
                <section className="w-full md:w-2/4 md:space-y-5">
                    <ProjectStatus
                        id={dataProject?.project_id as string}
                        address={address}
                        data={dataProject}

                    />
                    <Allocate
                        id={dataProject?.project_id as string}
                        address={address}
                        data={dataProject}

                    />
                    <MinimumContribute
                        id={dataProject?.project_id as string}
                        address={address}
                        data={dataProject}

                    />
                </section>
            </div>
        </Layout>
    );
}


export default ProjectPage