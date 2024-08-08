import { formatInputNumberPoint } from "@/utils/number";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Address, Hash } from "viem";
import { useBalance, useWaitForTransactionReceipt } from "wagmi";
import classNames from "classnames";
import { getBscChainNetwork } from "@/configurations/chains";
import { type Project } from "@/types/project";
import { createProject } from "@/utils/wagmi/contribute/writeContract";
import ConnectButton from "../Buttons/ConnectButton";

interface ProjectProps {
    id: string;
    address: string | undefined;
    data: Project | null | undefined;
    setRefetch: Dispatch<SetStateAction<boolean>>;
}

const bscChain = getBscChainNetwork()

const Project: React.FC<ProjectProps> = ({ id, address, data, setRefetch }) => {
    const [duration, setDuration] = useState<number | string>('')
    const [reward, setReward] = useState<number | string>(Number(data?.apy_investor || 0) || '')
    const [minAmount, setMinAmount] = useState<string>('')
    const [maxAmount, setMaxAmount] = useState<string>('')
    const [error, setError] = useState<boolean | null>(null);
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

        if (Number(balance?.value) < 10) {
            toast.warning(`Your BNB is lower than 10 wei please top up your BNB because gas fee is required to pay for the computational effort needed to process the transaction`)
            return
        }


        if (duration === '' || reward === '' || minAmount === '' || maxAmount === '') {
            setError(true)
            return;
        }

        try {
            // loading button
            setLoadingButton(true)
            const txHash = await createProject(address as Address, {
                id,
                duration,
                reward,
                minAmount: Number(minAmount.replace(/,/g, '')),
                maxAmount: Number(maxAmount.replace(/,/g, '')),
                status: 1
            })

            if (txHash) {
                setHash(txHash)
            }

            setRefetch(true)
        } catch (e) {
            console.log('project', e)
            setLoadingButton(false)
            toast.error("There was an error during create a project, try again in moment")
        }

    };

    const handleInputNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        if (!isNaN(Number(value)) || value === '') {
            if (name == 'duration') {
                setDuration(value)
            }

            if (name == 'reward') {
                setReward(value)
            }
        }
    };

    const handleChangeCurrency = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value, name } = e.target;

        // Remove commas for validation
        const numericValue = value.replace(/,/g, '')

        // Check if the input is a valid number (including decimal point)
        if (/^\d*\.?\d*$/.test(numericValue)) {
            const sanitizedValue = numericValue.replace(/^0+(?!$|\.)/, '');

            const numberValue = parseFloat(sanitizedValue);
            if (!isNaN(numberValue) || sanitizedValue === '') {
                const formattedAmount: string = formatInputNumberPoint(sanitizedValue);

                if (name == 'minAmount') {
                    setMinAmount(formattedAmount);
                }

                if (name == 'maxAmount') {
                    setMaxAmount(formattedAmount);
                }
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
        <div className="grid space-y-5">

            <div className="col-span-full">
                <label htmlFor="project-name" className="block text-sm font-medium leading-6">Project Name</label>
                <div className="mt-2">
                    <input
                        className="appearance-none border py-4 pl-4 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200 focus:placeholder-gray-600 transition rounded-sm w-full outline-none"
                        type="text"
                        disabled={true}
                        value={data?.project_name}
                        placeholder="Papua green forest"
                    />
                </div>
            </div>

            <div className="col-span-full">
                <label htmlFor="duration" className="block text-sm font-medium leading-6">Duration</label>
                <div className="mt-2">
                    <input
                        className="appearance-none border py-4 pl-4 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200 focus:placeholder-gray-600 transition rounded-sm w-full outline-none"
                        type="text"
                        name="duration"
                        value={duration}
                        placeholder="180 Days"
                        onChange={handleInputNumber}
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-red-500">
                    {error && duration === '' && 'Duration is required'}
                </p>
            </div>

            <div className="col-span-full">
                <label htmlFor="reward" className="block text-sm font-medium leading-6">Reward</label>
                <div className="mt-2">
                    <input
                        className="appearance-none border py-4 pl-4 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200 focus:placeholder-gray-600 transition rounded-sm w-full outline-none"
                        type="text"
                        name="reward"
                        value={reward}
                        placeholder="20%"
                        onChange={handleInputNumber}
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-red-500">
                    {error && reward === '' && 'Reward is required'}
                </p>
            </div>

            <div className="col-span-full">
                <label htmlFor="minimum-amount" className="block text-sm font-medium leading-6">Minimum Amount</label>
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
                <p className="mt-3 text-sm leading-6 text-red-500">
                    {error && minAmount === '' && 'Minimum amount is required'}
                </p>
            </div>

            <div className="col-span-full">
                <label htmlFor="maximum-amount" className="block text-sm font-medium leading-6">Maximum Amount</label>
                <div className="mt-2">
                    <input
                        className="appearance-none border py-4 pl-4 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200 focus:placeholder-gray-600 transition rounded-sm w-full outline-none"
                        type="text"
                        placeholder="200000"
                        name="maxAmount"
                        value={maxAmount}
                        onChange={handleChangeCurrency}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-red-500">
                    {error && maxAmount === '' && 'Maximum amount is required'}
                </p>
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
    )
}

export default Project