import React, { useEffect } from "react";
import SpinIcon from "../../assets/svg/SpinIcon";

import { formatNumber } from "../../utils/number";

import { DECIMALS } from "@/utils/wagmi";
import { getBscChainNetwork } from "@/configurations/chains";
import DonateIcon from "@/assets/svg/DonateIcon";
import { AHA_CONTRACT_ADDRESS } from "@/configurations/contract";
import { ResponseCurrencies, useCurrencies } from "@/hooks/useCurrencies";
import { getRateCurrenciesByName } from "@/utils/currencies";
import { useDarkMode } from "@/context/DarkModeContext";

interface ListDonateProps {
    id: string;
    listDonate: any[];
    loadingList: boolean;
    tokenPrice: BigInt;
}

const bscChain = getBscChainNetwork()

const ListDonate: React.FC<ListDonateProps> = ({ listDonate, loadingList, tokenPrice }) => {
    const { darkMode } = useDarkMode();
    const { data: dataCurrencies } = useCurrencies()
    const formatTokenPrice: number = Number(tokenPrice) / Number(DECIMALS)

    useEffect(() => {

        // for (let i = 0; i < listDonate.length; i++) {
        //     const rate = getTimeEstimatedMonths(Number(listDonate[i].args.duration), Number(listDonate[i].args.created));
        //     const rate
        //     if (estMonth < currentStake || currentStake === 0) {
        //         currentStake = i;
        //     }

        //     if (estMonth > lastStaked) {
        //         lastStaked = estMonth;
        //     }

        //     if (estMonth > new Date().getTime()) {
        //         unclaimed++;
        //     }

        //     totalAmountStaked += Number(listDonate[i].args.amount / DECIMALS);
        //     totalRewardStaked += getCalculateApr(Number(listDonate[i].args.amount / DECIMALS), Number(listDonate[i].args.duration).toString());
        // }
        console.log(listDonate)
    }, [listDonate]);

    if (loadingList) {
        return (
            <div className="col-span-2 place-self-center">
                <SpinIcon addClassName="animate-spin w-24 h-24 text-aha-green-light" />
            </div>
        );
    }

    return (
        <section className="col-span-2 py-6 space-y-8">
            <h3 className="text-xl font-semibold">Recent Donations</h3>
            {!loadingList && listDonate.map((v, k) => (
                <div key={k} className="flex flex-col sm:flex-row space-x-4 space-y-8 items-center sm:justify-between px-8 py-2 mx-auto bg-gray-300 dark:bg-gray-50 rounded-sm shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 bg-opacity-60 dark:bg-opacity-40">
                    <img className="block mx-auto h-14 rounded-full sm:mx-0 sm:shrink-0" src="/coin.webp" alt="AHA Token" />
                    <div className="text-center space-y-2 sm:text-left truncate max-w-72 md:max-w-full ">
                        {/* <div className="flex flex-col sm:flex-row space-y-0.5 sm:space-y-0 space-x-0 sm:space-x-2 text-center justify-center">
                            <p className="text-xl text-black dark:text-gray-200 font-semibold">Date</p>
                            <p className="text-xl text-black dark:text-gray-200 font-semibold">
                                {getStakeDate(Number(v.args.created))}
                            </p>
                        </div> */}
                        <a
                            href={`${bscChain.blockExplorers?.default.url}/tx/${v.transactionHash}`}
                            target="_blank"
                            rel="noreferrer"
                            className="block px-4 py-1 text-md text-white text-nowrap text-ellipsis font-semibold rounded-full bg-aha-green-light hover:text-white hover:bg-aha-green-dark hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                        >
                            {v.transactionHash}
                        </a>
                        <div className="flex justify-center">
                            <p className="text-lg text-slate-500 font-semibold">
                                {formatNumber(Number(v.args.amount / DECIMALS), 0, 2)}&nbsp;
                                {v.args.token && v.args.token === AHA_CONTRACT_ADDRESS ? 'AHA' : 'USDT'}&nbsp;
                                <span className="text-gray-600 dark:text-gray-400">
                                    ${formatNumber(
                                        Number(v.args.amount / DECIMALS) * getRateCurrenciesByName(dataCurrencies as ResponseCurrencies, v.args.token && v.args.token === AHA_CONTRACT_ADDRESS ? 'aha' : 'usdt', formatTokenPrice),
                                        0,
                                        2
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col text-center sm:text-right pl-4 sm:space-y-2">
                        <DonateIcon addClassName="w-14 h-12" color={darkMode ? "#519e2e" : "#507C5C"} />
                    </div>
                </div>
            ))}
        </section>
    );
}

export default ListDonate;
