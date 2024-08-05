import { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Address, Hash } from "viem";
import { useBalance, useWaitForTransactionReceipt } from "wagmi";
import classNames from "classnames";
import { getBscChainNetwork } from "@/configurations/chains";
import { type Project } from "@/types/project";
import { changeMinimumTokenAccepted } from "@/utils/wagmi/contribute/writeContract";
import ConnectButton from "../Buttons/ConnectButton";
import { formatInputNumberPoint } from "@/utils/number";

interface ProjectProps {
    id: string;
    address: string | undefined;
    data: Project | null | undefined;
}

const bscChain = getBscChainNetwork()

const MinimumContribute: React.FC<ProjectProps> = ({ address }) => {
    const [minAmount, setMinAmount] = useState<string>('')
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const { data: balance } = useBalance({ address: address as Address });
    const [hash, setHash] = useState<Hash | undefined>(undefined)
    const { isLoading: loadingTransaction, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: hash,
    });

    useEffect(() => {
        if (!isConfirmed) return

        toast.success('Transfer was successfull')
        setLoadingButton(false)
    }, [isConfirmed])

    const handleProject = async (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): Promise<void> => {
        e.preventDefault();

        const minContribute = Number(minAmount.replace(/,/g, ''))

        if (Number(balance?.value) < 10) {
            toast.warning(`Your BNB is lower than 10 wei please top up your BNB because gas fee is required to pay for the computational effort needed to process the transaction`)
            return
        }


        try {
            // loading button
            setLoadingButton(true)
            const txHash = await changeMinimumTokenAccepted(address as Address, minContribute)

            if (txHash) {
                setHash(txHash)
            }

        } catch (e) {
            console.log('project', e)
            setLoadingButton(false)
            toast.error("There was an error during change minimum contribute project, try again in moment")
        }

    };


    const handleChangeCurrency = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;

        // Remove commas for validation
        const numericValue = value.replace(/,/g, '')

        // Check if the input is a valid number (including decimal point)
        if (/^\d*\.?\d*$/.test(numericValue)) {
            const sanitizedValue = numericValue.replace(/^0+(?!$|\.)/, '');

            const numberValue = parseFloat(sanitizedValue);
            if (!isNaN(numberValue) || sanitizedValue === '') {
                const formattedAmount: string = formatInputNumberPoint(sanitizedValue);

                setMinAmount(formattedAmount);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
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
        <div className="flex flex-col px-4 sm:px-10 py-10 bg-gray-300 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-30">
            <h2 className="font-bold text-2xl">Change Minimum AHA Token Accepted </h2>
            <div className="grid space-y-5">

                <div className="col-span-full">
                    <div className="mt-2">
                        <input
                            className="appearance-none border py-4 pl-4 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200 focus:placeholder-gray-600 transition rounded-sm w-full outline-none"
                            type="text"
                            placeholder="100"
                            name="minAmount"
                            value={minAmount}
                            onChange={handleChangeCurrency}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-red-500"></p>
                </div>


                <div className="relative">
                    <ConnectButton
                        className={classNames({
                            'btn w-full block px-2 py-4 gap-x-2 text-xl text-center rounded-r-sm': true,
                            //'bg-opacity-50 pointer-events-none': !saleActive,
                            'flex justify-center': loadingButton
                        })}
                        address={address}
                        buttonText="Post"
                        loadingButton={loadingButton}
                        handleClick={handleProject}
                    />
                </div>

                {loadingTransaction && (<div className="relative">
                    <p className="text-center">Waiting for transaction to be confirmed...</p>
                </div>)}
                {isConfirmed && (<div className="overflow-hidden">
                    <p className="text-wrap text-center truncate text-ellipsis">
                        Tx Hash:  <a className="text-aha-green-light" target="_blank" href={`${bscChain.blockExplorers?.default.url}/tx/${hash}`}>0xd55bdc368b99170d43af98e6ed7e08eccd4587bb1fe3dc5e4d54543720506418{hash}</a>
                    </p>
                </div>)}
            </div>
        </div>
    )
}

export default MinimumContribute