import { formatInputNumberPoint, formatNumber } from "@/utils/number";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Address, Hash } from "viem";
import { useBalance, useWaitForTransactionReceipt } from "wagmi";
import SpinIcon from "@/assets/svg/SpinIcon";
import classNames from "classnames";
import { DECIMALS } from "@/utils/wagmi";
import { useMutation } from "@tanstack/react-query";
import { ResponseCurrencies, useCurrencies } from "@/hooks/useCurrencies";
import { getRateCurrenciesByName } from "@/utils/currencies";
import { formatDate, getCurrentDate, getEstimatedMonths } from "@/utils/date";
import { InvestType, usePostInvest } from "@/hooks/useInvest";
import UsdtIcon from "@/assets/svg/UsdtIcon";
import { getBscChainNetwork } from "@/configurations/chains";
import { queuesUp } from "@/utils/wagmi/contribute/writeContract";

interface InvestProps {
    id: string;
    address: string | undefined;
    tokenPrice: BigInt;
    setRefetch: Dispatch<SetStateAction<boolean>>;
    handleConnect: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void,
}

const bscChain = getBscChainNetwork()

const Invest: React.FC<InvestProps> = ({ id, address, tokenPrice, setRefetch, handleConnect }) => {
    const [amount, setAmount] = useState<string>('')
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const { data: balance } = useBalance({ address: address as Address });
    const [hash, setHash] = useState<Hash | undefined>(undefined)
    const { isLoading: loadingTransaction, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: hash,
    });
    const { data: dataCurrencies } = useCurrencies()
    const { mutate } = useMutation({
        mutationFn: (data: InvestType) => {
            return usePostInvest(data)
        },
    });

    useEffect(() => {
        if (!isConfirmed) return

        toast.success('Transfer was successfull')
        setLoadingButton(false)
    }, [isConfirmed])

    useEffect(() => {
        const invest = Number(amount.replace(/,/g, ''))
        const formatTokenPrice: number = Number(tokenPrice) / Number(DECIMALS)
        const rate = getRateCurrenciesByName(dataCurrencies as ResponseCurrencies, 'usdt', formatTokenPrice)
        const usdRate = invest * rate;

        if (hash) {
            mutate({
                donation_id: hash as string,
                donation_date: formatDate(),
                project_id: id,
                wallet_id: address as string,
                donation_currency: 'usdt',
                donation_value: invest,
                conversion_currency: "usd",
                conversion_value: usdRate,
                status: 1,
            })
        }
    }, [hash, dataCurrencies])

    const handleInvest = async (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): Promise<void> => {
        e.preventDefault();

        const invest = Number(amount.replace(/,/g, ''))

        if (Number(balance?.value) < 10) {
            toast.warning(`Your BNB is lower than 10 wei please top up your BNB because gas fee is required to pay for the computational effort needed to process the transaction`)

            return
        }

        try {
            // loading button
            setLoadingButton(true)
            const txtHash = await queuesUp(address as Address, invest, id)

            if (txtHash) {
                setHash(txtHash)
            }

            setRefetch(true)
        } catch (e) {
            console.log('transfer', e)
            setLoadingButton(false)
            toast.error("There was an error during invest, try again in moment")
        }

    };

    const handleChangeInvest = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;

        // Remove commas for validation
        const numericValue = value.replace(/,/g, '')

        // Check if the input is a valid number (including decimal point)
        if (/^\d*\.?\d*$/.test(numericValue)) {
            const sanitizedValue = numericValue.replace(/^0+(?!$|\.)/, '');

            const numberValue = parseFloat(sanitizedValue);
            if (!isNaN(numberValue) || sanitizedValue === '') {
                const formattedAmount: string = formatInputNumberPoint(sanitizedValue);
                setAmount(formattedAmount);
            }
        }
    };

    const handleKeyDownAmount = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const allowedKeys = [
            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Home', 'End', 'Escape', 'Shift', 'Control', 'Meta'
        ];

        if (
            e.ctrlKey ||
            e.metaKey ||
            allowedKeys.includes(e.key) ||
            // Allow F1-F12 keys
            (e.key.length === 2 && e.key.startsWith('F')) ||
            // Allow digits
            /^\d$/.test(e.key) ||
            // Allow decimal point if not already present
            (e.key === '.' && (e.currentTarget.value.split('.').length - 1) < 1)
        ) {
            return
        }
        e.preventDefault()
    };

    return (
        <div className="flex flex-col space-y-8">
            <div className="relative">
                <div className="absolute right-0 inset-y-0 flex items-center p-2 font-bold text-lg">
                    <p className="uppercase">usdt</p>&nbsp; <UsdtIcon addClassName="" />
                </div>
                <input
                    className="appearance-none border py-4 pl-4 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200 focus:placeholder-gray-600 transition rounded-sm w-full outline-none"
                    type="text"
                    value={amount}
                    placeholder="0"
                    onChange={handleChangeInvest}
                    onKeyDown={handleKeyDownAmount}
                />
            </div>

            <div className="relative">
                <button
                    className={classNames({
                        'btn w-full block px-2 py-4 gap-x-2 text-xl text-center rounded-r-sm': true,
                        //'bg-opacity-50 pointer-events-none': !saleActive,
                        'flex justify-center': loadingButton
                    })}
                    disabled={loadingButton}
                    onClick={address ? handleInvest : handleConnect}
                >
                    {
                        loadingButton ? (
                            <SpinIcon
                                addClassName={classNames({
                                    'w-8 h-8': true,
                                    'animate-spin': loadingButton
                                })}
                            />
                        )
                            : (address ? "Contribute" : "Connect")
                    }
                </button>
            </div>

            {loadingTransaction && (<div className="relative">
                <p className="text-center">Waiting for transaction to be confirmed...</p>
            </div>)}
            {isConfirmed && (<div className="relative">
                <p className="truncate text-center">
                    Tx Hash:  <a className="text-aha-green-light text-ellipsis" target="_blank" href={`${bscChain.blockExplorers?.default.url}/tx/${hash}`}>{hash}</a>
                </p>
            </div>)}
            <div className="flex flex-col justify-between p-2 gap-2">
                <h4 className="font-bold text-xl px-2 py-2">Summary</h4>
                <div className="grid grid-cols-2 border-b-2 border-gray-400 text-lg px-2">
                    <div>Date</div>
                    <div className="text-right">{getCurrentDate()} - {getEstimatedMonths(30)}</div>
                </div>
                <div className="grid grid-cols-2 border-b-2 border-gray-400 text-lg px-2">
                    <div>Estimated earn</div>
                    <div className="text-right">{formatNumber((Number(amount.replace(/,/g, '')) * 0.2  || 0), 0, 2)}</div>
                </div>
                <div className="grid grid-cols-2 border-b-2 border-gray-400 text-lg px-2">
                    <div>APR</div>
                    <div className="text-right">{20}%</div>
                </div>
                <p className="text-md self-end">Not working?&nbsp;
                    <a href="https://t.me/AnagataGlobal" className="font-bold text-aha-green-lighter hover:text-[#22c55e]">
                        Contact support
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Invest