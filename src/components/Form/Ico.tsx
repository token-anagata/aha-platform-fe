import AhaIcon from "@/assets/svg/AhaIcon";
import ArrowDownIcon from "@/assets/svg/ArrowDownIcon";
import SpinIcon from "@/assets/svg/SpinIcon";
import UsdtIcon from "@/assets/svg/UsdtIcon";
import { formatInputNumber, formatNumber } from "@/utils/number";
import { DECIMALS } from "@/utils/wagmi";
import { buyTokens } from "@/utils/wagmi/ico/writeContract";
import { approve } from "@/utils/wagmi/usdt/writeContract";
import classNames from "classnames";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Address, Hash } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";

interface IcoProps {
    tokenPrice: BigInt;
    address: string | undefined;
    setRefetch: Dispatch<SetStateAction<boolean>>;
    handleConnect: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void,
}

const Ico: React.FC<IcoProps> = ({ address, tokenPrice, setRefetch, handleConnect }) => {
    const [usdt, setUsdt] = useState<string>('')
    const [aha, setAha] = useState<string>('')
    const [formattedTokenPrice, setformattedTokenPrice] = useState<string>('0')
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [hashBuyToken, setHashBuyToken] = useState<Hash | undefined>(undefined)
    const { isLoading: loadingTransaction, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: hashBuyToken,
    });

    useEffect(() => {
        (async () => {
            if (isConfirmed) {
                try {
                    const amountToBuy = Number(usdt)
                    // Ask to permitted for move their funds to contract address
                    const result = await buyTokens(address as Address, amountToBuy)

                    if (result) {
                        // update list 
                        setRefetch(true)
                        setLoadingButton(false)

                        toast.success('Your funds have been successfully staked')
                    }
                } catch (e) {
                    console.log(e)
                    setLoadingButton(false)
                }
            }
        })()
    }, [isConfirmed])

    useEffect(() => {
        const formatTokenPrice: Number = Number(tokenPrice) / Number(DECIMALS)

        setformattedTokenPrice(formatTokenPrice.toString())
    }, [tokenPrice])

    const handleBuyToken = async (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): Promise<void> => {
        e.preventDefault();

        const amountToBuy = Number(usdt)

        try {
            // loading button
            setLoadingButton(true)
            // ask to pemitted for approve their balance
            const hashApprove = await approve(address as Address, amountToBuy)

            if (hashApprove) {
                toast.success('Approve was successfull')
                setHashBuyToken(hashApprove as Hash)
            }
        } catch (e) {
            console.log('buy tokens', e)
            setLoadingButton(false)
            toast.error("There was an error durring stake, try again in moment")
        }

    };

    const handleChangeAmountUsdt = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;

        // Remove commas for validation
        const numericValue = value.replace(/,/g, '')
        const price = Number(formattedTokenPrice);

        if (numericValue === '0') return

        if (/^\d*$/.test(numericValue)) {
            const numberValue = parseInt(numericValue, 10)
            if (!isNaN(numberValue) || value === '') {
                const formatAmount: string = formatInputNumber(numericValue)

                if (numberValue > 0) {
                    const ahaAmount: string = formatInputNumber(formatNumber(numberValue / price, 0, 3).toString())

                    setAha(ahaAmount)
                } else {
                    setAha('')
                }

                setUsdt(formatAmount)
            }
        }
    };

    const handleChangeAmountAha = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;

        // Remove commas for validation
        const numericValue = value.replace(/,/g, '')
        const price = Number(formattedTokenPrice);

        if (numericValue === '0') return

        if (/^\d*$/.test(numericValue)) {
            const numberValue = parseInt(numericValue, 10)
            if (!isNaN(numberValue) || value === '') {
                const formatAmount: string = formatInputNumber(numericValue)

                if (numberValue > 0) {
                    const usdtAmount: string = formatInputNumber(formatNumber(numberValue * price, 0, 3).toString())

                    setUsdt(usdtAmount)
                } else {
                    setUsdt('')
                }

                setAha(formatAmount)
            }
        }
    };

    const handleKeyDownAmount = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const controlKeys = [
            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'
        ];
        if (!controlKeys.includes(e.key) && !/^\d$/.test(e.key)) {
            e.preventDefault()
        }
    };

    return (
        <div className="flex flex-col space-y-5">
            <div className="relative">
                <div className="absolute right-0 inset-y-0 flex items-center p-2 font-bold text-lg">
                    USDT &nbsp; <UsdtIcon addClassName="" />
                </div>
                <input
                    className="appearance-none border py-4 pl-4 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200 focus:placeholder-gray-600 transition rounded-sm w-full outline-none"
                    type="text"
                    placeholder={formattedTokenPrice}
                    value={usdt}
                    onChange={handleChangeAmountUsdt}
                    onKeyDown={handleKeyDownAmount}
                />
            </div>

            <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400"><ArrowDownIcon addClassName="" /></span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <div className="relative">
                <input
                    className="appearance-none border py-4 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200 focus:placeholder-gray-600 transition rounded-sm w-full outline-none"
                    type="text"
                    placeholder="1,00"
                    value={aha}
                    onChange={handleChangeAmountAha}
                    onKeyDown={handleKeyDownAmount}
                />
                <div className="absolute right-0 inset-y-0 flex items-center p-2 font-bold text-lg">
                    AHA &nbsp; <AhaIcon addClassName="" />
                </div>
            </div>

            <div className="relative">
                <button
                    className={classNames({
                        'btn w-full block px-2 py-4 gap-x-2 text-xl text-center rounded-r-sm': true,
                        //'bg-opacity-50 pointer-events-none': !saleActive,
                        'flex justify-center': loadingButton
                    })}
                    disabled={loadingButton}
                    onClick={address ? handleBuyToken : handleConnect}
                >
                    {
                        loadingButton ? (<SpinIcon addClassName="" />) : (address ? "Buy Token" : "Connect")
                    }
                </button>
            </div>

            {loadingTransaction && (<div className="relative">
                <p className="text-center">Waiting for transaction to be confirmed...</p>
            </div>)}
        </div>
    )
}

export default Ico