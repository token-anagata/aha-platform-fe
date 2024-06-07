import { formatInputNumber } from "@/utils/number";
import { decodeLog } from "@/utils/wagmi";
import { buyTokens } from "@/utils/wagmi/ico/writeContract";
import classNames from "classnames";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Address, Hash } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";
import ChainSelectBox, { CHAIN_OPTS } from "./Select/ChainSelectBox";
import SpinIcon from "@/assets/svg/SpinIcon";
import { ChainOpts } from "@/types/chain";

interface DonationProps {
    address: string | undefined;
    setRefetch: Dispatch<SetStateAction<boolean>>;
    handleConnect: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void,
}

type HashTransaction = {
    hash: Hash | undefined;
    mode: 'approve' | 'buy' | undefined;
}

const Donation: React.FC<DonationProps> = ({ address, setRefetch, handleConnect }) => {
    const [donation, setDonation] = useState<string>('')
    const [chain, setChain] = useState<ChainOpts>(CHAIN_OPTS[0])
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
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
                const donate = Number(donation)
                // Ask to permitted for move their funds to contract address
                const result = await buyTokens(address as Address, donate)

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

    const handleDonation = async (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): Promise<void> => {
        e.preventDefault();

        //const donate = Number(donation.replace(/,/g, ''))

        try {
            // loading button
            setLoadingButton(true)
            // ask to pemitted for approve their balance
            // const hashApprove = await approve(address as Address, donate)

            // if (hashApprove) {
            //     toast.success('Approve was successfull')
            //     setHashTransaction(prevState => ({
            //         ...prevState,
            //         hash: hashApprove as Hash,
            //         mode: 'approve'
            //     }))
            // }
        } catch (e) {
            console.log('buy tokens', e)
            setLoadingButton(false)
            toast.error("There was an error durring buy token, try again in moment")
        }

    };

    const handleChangeDonation = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;

        // Remove commas for validation
        const numericValue = value.replace(/,/g, '')

        if (numericValue === '0') return

        if (/^\d*$/.test(numericValue)) {
            const numberValue = parseInt(numericValue, 10)
            if (!isNaN(numberValue) || value === '') {
                const formatAmount: string = formatInputNumber(numericValue)

                setDonation(formatAmount)
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

    const handleChain = (chain: ChainOpts) => {
        setChain(chain);
    };

    return (
        <div className="flex flex-col space-y-5">
            <div className="relative">
                <ChainSelectBox onChange={handleChain} />
            </div>
            <div className="relative">
            <div className="absolute right-0 inset-y-0 flex items-center p-2 font-bold text-lg">
                    <p className="uppercase">{chain.value}</p>&nbsp; {chain.icon}
                </div>
                <input
                    className="appearance-none border py-4 pl-4 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200 focus:placeholder-gray-600 transition rounded-sm w-full outline-none"
                    type="text"
                    value={donation}
                    placeholder="0"
                    onChange={handleChangeDonation}
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
                    onClick={address ? handleDonation : handleConnect}
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
                            : (address ? "Buy Token" : "Connect")
                    }
                </button>
            </div>

            <div className="flex justify-center">
                <p className="font-normal text-sm"> We very apreciate every piece your give</p>
            </div>

            {loadingTransaction && (<div className="relative">
                <p className="text-center">Waiting for transaction to be confirmed...</p>
            </div>)}
        </div>
    )
}

export default Donation