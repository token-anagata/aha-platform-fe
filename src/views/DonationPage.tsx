import Divider from "@/components/Borders/Divider";
import GasFee from "@/components/Description/GasFee";
import Donation from "@/components/Form/Donation";
import Layout from "@/components/Layout/Main";
import ModalInfo from "@/components/Modal/ModalInfo";
import { useStore } from "@/context/StoreContext";
import { OpenParams } from "@/types/account";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import React, { MouseEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const DonationPage: React.FC = () => {
    const { open } = useWeb3Modal();
    const { address } = useAccount();
    const [refetch, setRefetch] = useState<boolean>(false);
    const { gasInfoDonation, setGasInfoDonation } = useStore();

    const closeModal = () => setGasInfoDonation(false);


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
            setRefetch(false)
        })()
    }, [address, refetch])


    return (
        <Layout type="default">
            <div className="flex justify-center">
                <section className="w-full md:w-2/4 px-4 sm:px-10 py-10 md:space-y-5 bg-gray-300 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-30">
                    <p className="text-2xl font-semibold text-center">Donate to</p>
                    <Donation
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
        </Layout>
    );
}


export default DonationPage