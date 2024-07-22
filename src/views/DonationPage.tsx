import Divider from "@/components/Borders/Divider";
import ListDonate from "@/components/Box/ListDonate";
import CardDonation from "@/components/Card/CardDonation";
import GasFee from "@/components/Description/GasFee";
import Donation from "@/components/Form/Donation";
import Layout from "@/components/Layout/Main";
import ModalInfo from "@/components/Modal/ModalInfo";
import { DEFAULT_ADDRESS } from "@/configurations/common";
import { useStore } from "@/context/StoreContext";
import { useProject } from "@/hooks/useProject";
import { OpenParams } from "@/types/account";
import { getListDonate } from "@/utils/wagmi/donation/eventContract";
import { getTokenPrice } from "@/utils/wagmi/ico/readContract";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import React, { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Address } from "viem";
import { useAccount } from "wagmi";

const DonationPage: React.FC = () => {
    const { open } = useWeb3Modal();
    const { address, connector } = useAccount();
    const [refetch, setRefetch] = useState<boolean>(false);
    const { gasInfoDonation, setGasInfoDonation } = useStore();
    const [tokenPrice, setTokenPrice] = useState<BigInt>(BigInt(0));
    const [listDonate, setListDonate] = useState<any[]>([]);
    const [loadingList, setLoadingList] = useState<boolean>(true);
    const { id } = useParams();
    const { data: dataProject, isError } = useProject(id as string)
    const navigate = useNavigate()

    const closeModal = () => setGasInfoDonation(false);

    const handleConnect = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        e.preventDefault();
        if (address) {
            open({ view: "Account" } as OpenParams);
        } else {
            open({ view: "Connect" } as OpenParams);
        }
    };

    console.log(connector)

    useEffect(() => {
        if (isError || dataProject === null) navigate('/not-found');
    }, [dataProject, isError])

    useEffect(() => {
        (async () => {
            const price = await getTokenPrice(address || DEFAULT_ADDRESS as Address) as BigInt;
            const list = await getListDonate(dataProject?.project_id as string);

            setListDonate(list);
            setTokenPrice(price)
            setRefetch(false)
            setLoadingList(false)
        })()
    }, [address, refetch])

    return (
        <Layout type="default">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <section className="w-full md:w-2/4 px-4 py-2 md:space-y-5 bg-gray-100 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-30">
                    <CardDonation
                        data={dataProject}
                    />
                </section>
                <section className="w-full md:w-2/4 px-4 sm:px-10 py-10 md:space-y-5 bg-gray-300 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-30">
                    <p className="text-2xl font-semibold text-center">Donate to</p>
                    <Donation
                        id={dataProject?.project_id as string}
                        tokenPrice={tokenPrice}
                        address={address}
                        handleConnect={handleConnect}
                        setRefetch={setRefetch}
                    />
                    <Divider />

                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-semibold text-center">Make the World a Better Place</p>
                        <p className="font-normal text-sm text-center"> We very apreciate every piece your give</p>
                    </div>

                    <ModalInfo
                        isOpen={gasInfoDonation}
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
                <ListDonate
                    id={dataProject?.project_id as string}
                    tokenPrice={tokenPrice}
                    listDonate={listDonate}
                    loadingList={loadingList}
                />
            </div>
        </Layout>
    );
}


export default DonationPage