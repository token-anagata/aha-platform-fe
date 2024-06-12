import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames";
import SpinIcon from "../../assets/svg/SpinIcon";
import { getStakeDate, getStakeEstimatedMonths, getTimeEstimatedMonths } from "../../utils/date";

import { getApr, getCalculateApr } from "../../utils/stake";
import { useAccountStaked } from "../../context/AccountStakedContext";
import { formatNumber } from "../../utils/number";
import { unstake } from "@/utils/wagmi/stake/writeContract";
import { Address } from "viem";
import { DECIMALS } from "@/utils/wagmi";
import { getBscChainNetwork } from "@/configurations/chains";

interface ListStakeProps {
  listStake: any[];
  loadingList: boolean;
  setLoadingList: (loading: boolean) => void;
  address: string;
}

const bscChain = getBscChainNetwork()

const ListStake: React.FC<ListStakeProps> = ({ listStake, loadingList, setLoadingList, address }) => {
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const {
    updateRewardStaked,
    updateAmountStaked,
    updateTotalStaked,
    updateLastStaked,
    updateCurrentStake,
    updateUnclaimedStake,
  } = useAccountStaked();

  useEffect(() => {
    let totalAmountStaked = 0;
    let totalRewardStaked = 0;
    let currentStake = 0;
    let lastStaked = 0;
    let unclaimed = 0;

    for (let i = 0; i < listStake.length; i++) {
      const estMonth = getTimeEstimatedMonths(Number(listStake[i].args.duration), Number(listStake[i].args.created));

      if (estMonth < currentStake || currentStake === 0) {
        currentStake = i;
      }

      if (estMonth > lastStaked) {
        lastStaked = estMonth;
      }

      if (estMonth > new Date().getTime()) {
        unclaimed++;
      }

      totalAmountStaked += Number(listStake[i].args.amount / DECIMALS);
      totalRewardStaked += getCalculateApr(Number(listStake[i].args.amount / DECIMALS), Number(listStake[i].args.duration).toString());
    }

    updateTotalStaked(listStake.length);
    updateAmountStaked(totalAmountStaked);
    updateRewardStaked(totalRewardStaked);
    updateCurrentStake(currentStake);
    updateLastStaked(lastStaked.toString());
    updateUnclaimedStake(unclaimed);
  }, [listStake, updateAmountStaked, updateCurrentStake, updateLastStaked, updateRewardStaked, updateTotalStaked, updateUnclaimedStake]);

  const handleUnStake = async (cycleId: number) => {
    try {
      setLoadingButton(true);
      const result = await unstake(address as Address, cycleId);

      if (result) {
        setLoadingButton(false);
        setLoadingList(true);
        toast.success('Unstake have been successfully');
      }
    } catch (e) {
      console.log('unstake', e);
      setLoadingButton(false);
      toast.error("There was an error during unstake, try again in a moment");
    }
  }

  if (loadingList) {
    return (
      <div className="col-span-2 place-self-center">
        <SpinIcon addClassName="animate-spin w-24 h-24 text-aha-green-light" />
      </div>
    );
  }

  return (
    <section className="col-span-2 py-6 space-y-8">
      {!loadingList && listStake.map((v, k) => (
        <div key={k} className="flex flex-col sm:flex-row space-x-4 space-y-8 sm:justify-between px-8 py-2 mx-auto bg-gray-300 rounded-sm shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 bg-opacity-60 dark:bg-opacity-30">
          <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="./coin.webp" alt="AHA Token" />
          <div className="text-center space-y-2 sm:text-left">
            <div className="flex flex-col sm:flex-row space-y-0.5 sm:space-y-0 space-x-0 sm:space-x-2 text-center justify-center">
              <p className="text-xl text-black dark:text-gray-200 font-semibold">Staking Date</p>
              <p className="text-xl text-black dark:text-gray-200 font-semibold">
                {getStakeDate(Number(v.args.created))} - {getStakeEstimatedMonths(Number(v.args.duration), Number(v.args.created))}
              </p>
              <p className="text-aha-green-light text-xl">{Number(v.args.duration)} Month</p>
            </div>
            <div className="space-y-0.5 text-center">
              <p className="text-lg text-slate-500 font-semibold">
                {formatNumber(Number(v.args.amount / DECIMALS), 0, 2)} AHA
              </p>
            </div>
            <a
              href={`${bscChain.blockExplorers?.default.url}/tx/${v.transactionHash}`}
              target="_blank"
              rel="noreferrer"
              className="block px-4 py-1 text-md text-white text-ellipsis overflow-hidden font-semibold rounded-full bg-aha-green-light hover:text-white hover:bg-aha-green-dark hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              {v.transactionHash}
            </a>
          </div>
          <div className="flex flex-col text-center sm:text-right pl-4 sm:space-y-2">
            <p className="font-bold text-xl">Cycle Number <span className="text-aha-green-lighter">{k + 1}</span></p>
            <p className="font-semibold text-xl text-aha-green-light">
              {formatNumber(getCalculateApr(Number(v.args.amount / DECIMALS), Number(v.args.duration).toString()), 0, 2)}&nbsp;
              <i className="text-gray-500">({getApr(Number(v.args.amount / DECIMALS), Number(v.args.duration).toString()) * 100}%)</i>
            </p>
            <button
              className={classNames({
                'btn btn rounded-sm py-1.5 px-6': true,
                'disabled:bg-aha-green-dark': getTimeEstimatedMonths(Number(v.args.duration), Number(v.args.created)) >= new Date().getTime(),
              })}
              disabled={loadingButton || getTimeEstimatedMonths(Number(v.args.duration), Number(v.args.created)) >= new Date().getTime()}
              onClick={() => handleUnStake(k)}
            >
              {loadingButton ? <><SpinIcon addClassName="animate-spin -ml-1 mr-3 text-white h-5 w-5" /> Processing</> : 'Unstake'}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ListStake;
