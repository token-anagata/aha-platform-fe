import ListStake from "@/components/Box/ListStake";
import MainStake from "@/components/Box/MainStake";
import UnstakeCycle from "@/components/Box/UnstakeCycle";
import Stake from "@/components/Form/Stake";
import Layout from "@/components/Layout/Main";
import { getListStakeByAddress } from "@/utils/wagmi/stake/eventContract";
import React, { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

const StakePage: React.FC = () => {
    const [listStake, setListStake] = useState<any[]>([]);
    const [loadingList, setLoadingList] = useState<boolean>(true);
  
    const { address, isConnected, isDisconnected } = useAccount();
  
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
        </Layout>
    );
}


export default StakePage