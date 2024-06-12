import ListStake from "@/components/Box/ListStake";
import MainStake from "@/components/Box/MainStake";
import UnstakeCycle from "@/components/Box/UnstakeCycle";
import GasFee from "@/components/Description/GasFee";
import Stake from "@/components/Form/Stake";
import Layout from "@/components/Layout/Main";
import ModalInfo from "@/components/Modal/ModalInfo";
import { getBscChainNetwork } from "@/configurations/chains";
import { useStore } from "@/context/StoreContext";
import { getListStakeByAddress } from "@/utils/wagmi/stake/eventContract";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

const bscChain = getBscChainNetwork()

const StakePage: React.FC = () => {
  const [listStake, setListStake] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const { address, isConnected, isDisconnected, status } = useAccount();
  const { gasInfoStake, setGasInfoStake } = useStore();
  const { switchChainAsync } = useSwitchChain();
  const chainId = useChainId()
  const closeModal = () => setGasInfoStake(false);

  useEffect(() => {
    (async () => {
      if (chainId !== bscChain.id) {
        await switchChainAsync({ chainId: bscChain.id });
      } 
    })()
  }, [status])

  useEffect(() => {
    const fetchData = async () => {
      const list = await getListStakeByAddress(address as Address);

      if (list) {
        setListStake(list);
        setLoadingList(false);
      }
    };

    if (address) {
      fetchData();
    } else {
      setListStake([]);
      setLoadingList(false);
    }
  }, [address, isDisconnected, loadingList]);

  useEffect(() => {
    setLoadingList(true);
  }, [isConnected]);

  return (
    <Layout type="stake">
      {/** Component main stake get information connected current user */}
      <MainStake
        address={address as Address}
        loadingList={loadingList}
        setLoadingList={setLoadingList}
      />

      {/** Component form stake connected current user */}
      <Stake
        address={address}
        isDisconnected={isDisconnected}
        setLoadingList={setLoadingList}
      />

      {/** List user stake */}
      <ListStake
        address={address as Address}
        listStake={listStake}
        loadingList={loadingList}
        setLoadingList={setLoadingList}
      />

      {/** Component Unstake cycle from connected current user */}
      <UnstakeCycle address={address as Address} />

      <ModalInfo
        isOpen={gasInfoStake}
        onClose={closeModal}
        title="Gas Fees"
        closeText="I understand"
      >
        <GasFee />
      </ModalInfo>
    </Layout>
  );
}


export default StakePage