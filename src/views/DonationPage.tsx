import SpinIcon from "@/assets/svg/SpinIcon";
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
import { getTokenPrice } from "@/utils/wagmi/ico/readContract";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Address } from "viem";
import { useAccount } from "wagmi";

const DonationPage: React.FC = () => {
    const { address, isConnected } = useAccount();
    const [refetch, setRefetch] = useState<boolean>(false);
    const { gasInfoDonation, setGasInfoDonation } = useStore();
    const [tokenPrice, setTokenPrice] = useState<BigInt>(BigInt(0));
    const { id } = useParams();
    const { data: dataProject, isError } = useProject(id as string)
    const navigate = useNavigate()

    const closeModal = () => setGasInfoDonation(false);

    useEffect(() => {
        if (isError || dataProject === null) navigate('/not-found');
    }, [dataProject, isError])

    useEffect(() => {
        (async () => {
            setRefetch(true)
        })()
    }, [isConnected])


    useEffect(() => {
        (async () => {
            const price = await getTokenPrice(address || DEFAULT_ADDRESS as Address) as BigInt;

            setTokenPrice(price)
            setRefetch(false)
        })()
    }, [address, refetch])

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
                <section className="w-full md:w-2/4 px-4 py-2 md:space-y-5 bg-gray-100 dark:bg-gray-50 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-40">
                    <CardDonation
                        data={dataProject}
                    />
                </section>
                <section className="w-full md:w-2/4 px-4 sm:px-10 py-10 md:space-y-5 bg-gray-300 dark:bg-gray-50 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-40">
                    <p className="text-2xl font-semibold text-center">Donate to</p>
                    <Donation
                        id={dataProject?.project_id as string}
                        tokenPrice={tokenPrice}
                        address={address}
                        setRefetch={setRefetch}
                    />
                    <Divider />

                    <div className="flex flex-col justify-center py-6">
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
                    id={dataProject?.slug as string}
                    refetch={refetch}
                    setRefetch={setRefetch}
                />
            </div>
        </Layout>
    );
}


export default DonationPage