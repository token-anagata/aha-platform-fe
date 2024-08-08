import AhaIcon from "@/assets/svg/AhaIcon";
import ArrowDownIcon from "@/assets/svg/ArrowDownIcon";
import UsdtIcon from "@/assets/svg/UsdtIcon";
import { RangePrice } from "@/types/token";
import { formatInputNumber, formatNumber, formatToken } from "@/utils/number";
import { DECIMALS, decodeLog } from "@/utils/wagmi";
import { buyTokens } from "@/utils/wagmi/ico/writeContract";
import { approve } from "@/utils/wagmi/usdt/writeContract";
import classNames from "classnames";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Address, Hash } from "viem";
import { useBalance, useWaitForTransactionReceipt } from "wagmi";
import ConnectButton from "../Buttons/ConnectButton";

interface IcoProps {
    tokenPrice: BigInt;
    rangePrice: RangePrice;
    address: string | undefined;
    setRefetch: Dispatch<SetStateAction<boolean>>;
}

type HashTransaction = {
    hash: Hash | undefined;
    mode: 'approve' | 'buy' | undefined;
}

const Ico: React.FC<IcoProps> = ({ address, tokenPrice, rangePrice, setRefetch }) => {
    const [usdt, setUsdt] = useState<string>('')
    const [aha, setAha] = useState<string>('')
    const [formattedTokenPrice, setformattedTokenPrice] = useState<string>('0')
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const { data: balance } = useBalance({ address: address as Address })
    const [hashTransaction, setHashTransaction] = useState<HashTransaction>({ hash: undefined, mode: undefined })
    const { data: dataTransaction, isLoading: loadingTransaction, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: hashTransaction.hash,
    });

    useEffect(() => {
        (async () => {
            if (!isConfirmed) return

            if (hashTransaction.mode === 'buy') {
                // update list 
                setHashTransaction(prevState => ({
                    ...prevState,
                    hash: undefined,
                    mode: undefined
                }))
                setRefetch(true)
                setLoadingButton(false)

                toast.success('Your have been successfully buy AHA token')

                return
            }


            try {
                const topics = decodeLog(dataTransaction.logs)
                const amountToBuy = Number(usdt)
                // Ask to permitted for move their funds to contract address
                const result = await buyTokens(address as Address, amountToBuy)

                console.log(topics)
                if (result) {
                    // update mode 
                    setHashTransaction(prevState => ({
                        ...prevState,
                        hash: result,
                        mode: 'buy'
                    }))
                }
            } catch (e) {
                console.log(e)
                setLoadingButton(false)
            }
        })()
    }, [isConfirmed])

    useEffect(() => {
        const formatTokenPrice: Number = Number(tokenPrice) / Number(DECIMALS)

        setformattedTokenPrice(formatTokenPrice.toString())
    }, [tokenPrice])

    const handleBuyToken = async (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): Promise<void> => {
        e.preventDefault();

        const amountToBuy = Number(usdt.replace(/,/g, ''))
        const min = formatToken(rangePrice.min)
        const max = formatToken(rangePrice.max)

        if (amountToBuy < min || amountToBuy > max) {
            toast.warning(`Amount is not in range token price. Minimum ${min} USDT & Maximum ${max} USDT `)

            return
        }

        if (Number(balance?.value) < 10) {
            toast.warning(`Your BNB is lower than 10 wei please top up your BNB because gas fee is required to pay for the computational effort needed to process the transaction`)

            return
        }

        try {
            // loading button
            setLoadingButton(true)
            // ask to pemitted for approve their balance
            const hashApprove = await approve(address as Address, amountToBuy)

            if (hashApprove) {
                toast.success('Approve was successfull')
                setHashTransaction(prevState => ({
                    ...prevState,
                    hash: hashApprove as Hash,
                    mode: 'approve'
                }))
            }
        } catch (e) {
            console.log('buy tokens', e)
            setLoadingButton(false)
            toast.error("There was an error durring buy token, try again in moment")
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
                <div className="flex-grow border-t border-gray-400 dark:border-gray-50"></div>
                <span className="flex-shrink mx-4 text-gray-400 dark:text-gray-50"><ArrowDownIcon addClassName="" /></span>
                <div className="flex-grow border-t border-gray-400 dark:border-gray-50"></div>
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
                <ConnectButton
                    className={classNames({
                        'btn w-full block px-2 py-4 gap-x-2 text-xl text-center rounded-r-sm': true,
                        //'bg-opacity-50 pointer-events-none': !saleActive,
                        'flex justify-center': loadingButton
                    })}
                    address={address}
                    buttonText="Buy Token"
                    loadingButton={loadingButton}
                    handleClick={handleBuyToken}
                />
            </div>

            <div className="flex justify-center">
                <p className="font-normal text-sm"> 1 AHA ~ {formattedTokenPrice} USDT</p>
            </div>

            {loadingTransaction && (<div className="relative">
                <p className="text-center">Waiting for transaction to be confirmed...</p>
            </div>)}
        </div>
    )
}

export default Ico