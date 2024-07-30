import React, { useEffect } from "react";
import SpinIcon from "../../assets/svg/SpinIcon";

import { formatNumber } from "../../utils/number";

import { getBscChainNetwork } from "@/configurations/chains";
import { useListDonation } from "@/hooks/useDonation";
import AhaIcon from "@/assets/svg/AhaIcon";
import UsdtIcon from "@/assets/svg/UsdtIcon";
import XrpIcon from "@/assets/svg/XrpIcon";
import SolanaIcon from "@/assets/svg/SolanaIcon";

interface ListDonateProps {
    id: string;
    loadingList: boolean;
}

const bscChain = getBscChainNetwork()

const ListDonate: React.FC<ListDonateProps> = ({ id, loadingList }) => {
    const { data: listDonate, refetch } = useListDonation(id as string)

    useEffect(() => {
        refetch()
    }, [loadingList])

    if (loadingList || listDonate == null) {
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
                    <img className="block mx-auto h-16 rounded-full sm:mx-0 sm:shrink-0" src="/coin.webp" alt="AHA Token" />
                    <div className="text-center space-y-2 sm:text-left truncate max-w-72 md:max-w-full ">
                        {/* <div className="flex flex-col sm:flex-row space-y-0.5 sm:space-y-0 space-x-0 sm:space-x-2 text-center justify-center">
                            <p className="text-xl text-black dark:text-gray-200 font-semibold">Date</p>
                            <p className="text-xl text-black dark:text-gray-200 font-semibold">
                                {getStakeDate(Number(v.args.created))}
                            </p>
                        </div> */}
                        <a
                            href={`${bscChain.blockExplorers?.default.url}/tx/${v.donation_id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="block px-4 py-1 text-md text-white text-nowrap text-ellipsis font-semibold rounded-full bg-aha-green-light hover:text-white hover:bg-aha-green-dark hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                        >
                            {v.donation_id}
                        </a>
                        <div className="flex justify-center">
                            <p className="text-lg text-slate-500 font-semibold uppercase">
                                {formatNumber(Number(v.donation_value), 0, 2)}&nbsp;
                                {v.donation_currency}&nbsp;
                                <span className="text-gray-600 dark:text-gray-400">
                                    ${formatNumber(
                                        Number(v.conversion_value),
                                        0,
                                        2
                                    )}
                                </span>
                                <span>

                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col text-center sm:text-right pl-4 sm:space-y-2">
                        {
                            v.donation_currency === 'aha' && <AhaIcon addClassName="w-24 h-16" />
                        }
                        {
                            v.donation_currency === 'usdt' && <UsdtIcon addClassName="w-24 h-16" />
                        }
                        {
                            v.donation_currency === 'xrp' && <XrpIcon addClassName="w-24 h-12" />
                        }
                        {
                            v.donation_currency === 'sol' && <SolanaIcon addClassName="w-24 h-12" />
                        }
                    </div>
                </div>
            ))}
        </section>
    );
}

export default ListDonate;
