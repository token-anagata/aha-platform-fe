import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SpinIcon from "../../assets/svg/SpinIcon";
import { formatNumber } from "../../utils/number";
import UsdtIcon from "@/assets/svg/UsdtIcon";
import { getChainUrl } from "@/utils/url";
import { useListInvest } from "@/hooks/useInvest";
import { Address } from "viem";
import { Project } from "@/types/project";
import { useCurrencies } from "@/hooks/useCurrencies";
import classNames from "classnames";
import QueueIcon from "@/assets/svg/QueueIcon";
import ContributeIcon from "@/assets/svg/ContributeIcon";
import { useDarkMode } from "@/context/DarkModeContext";

interface ListInvestProps {
    id: string;
    address: Address | undefined;
    data: Project;
    refetch: boolean;
    setRefetch: Dispatch<SetStateAction<boolean>>;
}

const ListInvest: React.FC<ListInvestProps> = ({ id, address, data, refetch, setRefetch }) => {
    const { data: listInvest, refetch: refetchList, isLoading } = useListInvest(id as string, address as Address)
    const { data: dataCurrencies } = useCurrencies()
    const [usdRate, setUsdRate] = useState<number>(0)
    const { darkMode } = useDarkMode()

    useEffect(() => {
        refetchList()
        setRefetch(false)
    }, [refetch])

    useEffect(() => {
        if (dataCurrencies) {
            const usd = dataCurrencies.tether.usd

            setUsdRate(usd)
        }
    }, [dataCurrencies])

    if (isLoading || listInvest == null) {
        return (
            <div className="col-span-2 place-self-center">
                <SpinIcon addClassName="animate-spin w-24 h-24 text-aha-green-light" />
            </div>
        );
    }

    return (
        <section className="col-span-2 py-6 space-y-8">
            <h3 className="text-xl font-semibold">History</h3>
            {!refetch && listInvest.map((v, k) => (
                <div key={k} className="flex flex-col sm:flex-row space-x-4 space-y-8 items-center sm:justify-between px-8 py-2 mx-auto bg-gray-300 dark:bg-gray-50 rounded-sm shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 bg-opacity-60 dark:bg-opacity-40">
                    <img className="block mx-auto h-16 rounded-full sm:mx-0 sm:shrink-0" src="/coin.webp" alt="AHA Token" />
                    <div className="text-center space-y-2 sm:text-left truncate max-w-72 md:max-w-full">
                        <a
                            href={getChainUrl(v.investment_currency, v.investment_id)}
                            target="_blank"
                            rel="noreferrer"
                            className="block px-4 py-1 text-md text-white text-nowrap text-ellipsis font-semibold rounded-full bg-aha-green-light hover:text-white hover:bg-aha-green-dark hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                        >
                            {v.investment_id}
                        </a>
                        <div className="flex justify-center">
                            <p className="flex text-lg text-slate-500 font-semibold uppercase">
                                {formatNumber(Number(v.investment_value), 0, 8)}&nbsp;USDT&nbsp;
                                <UsdtIcon addClassName="w-6 h-6 m-auto" />&nbsp;
                                <span className="text-gray-600 dark:text-gray-300">
                                    ${formatNumber(
                                        Number(v.investment_value) * usdRate,
                                        0,
                                        2
                                    )}
                                </span>
                            </p>
                        </div>
                        {/* <p className="text-center text-aha-green-light text-xs leading-3">{v.donation_date}</p> */}
                    </div>
                    <div className="flex flex-col items-center md:items-end justify-end sm:text-right pl-4 sm:space-y-2">
                        <p className="text-gray-800 dark:text-gray-300 text-lg">{v.investment_date} - {data.end_date}</p>
                        <p className={classNames({
                            'flex items-center justify-end text-lg': true,
                            'text-yellow-500 dark:text-yellow-400': v.status === 0,
                            'text-aha-green-light dark:text-aha-green-lighter': v.status === 1
                        })}>
                            {v.status === 0 ? 'In Queue' : 'Success'}
                            &nbsp;
                            {v.status === 0 ? <QueueIcon addClassName="w-6 h-6" /> : <ContributeIcon addClassName="w-6 h-6" darkMode={darkMode} />}
                            {formatNumber((Number(v.investment_value) * (Number(data.apy_investor) / 100) || 0), 0, 2)}&nbsp;
                            USDT&nbsp;<UsdtIcon addClassName="w-6 h-6" />

                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default ListInvest;
