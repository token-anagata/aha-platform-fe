import BnbIcon from "@/assets/svg/BnbIcon";
import classNames from "classnames";
import ConnectButton from "../Buttons/ConnectButton";
import { MouseEvent, useEffect, useState } from "react";
import { Project } from "@/types/project";
import { getTotalProjectAmount } from "@/utils/wagmi/contribute/readContract";
import { Address, Hash } from "viem";
import { allocateFund } from "@/utils/wagmi/contribute/writeContract";
import { useWaitForTransactionReceipt } from "wagmi";
import { toast } from "react-toastify";
import { getBscChainNetwork } from "@/configurations/chains";

interface IcoBalanceProps {
    id: string;
    address: string | undefined;
    data: Project | null | undefined;
}

const bscChain = getBscChainNetwork()

const Allocate: React.FC<IcoBalanceProps> = ({ id, address, data }) => {
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [totalAmount, setTotalAmount] = useState<number>(0)

    const [hash, setHash] = useState<Hash | undefined>(undefined)
    const { isLoading: loadingTransaction, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: hash,
    });

    useEffect(() => {
        if (!isConfirmed) return

        toast.success('Allocate funds of project was successfull')
        setLoadingButton(false)
    }, [isConfirmed])

    useEffect(() => {
        (async () => {
            try{
                const totalAmount = await getTotalProjectAmount(address as Address, id);
                
                setTotalAmount(Number(totalAmount))
            }catch(e){
                setTotalAmount(0)
            }
        })()
    }, [address])

    const handleProject = async (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): Promise<void> => {
        e.preventDefault();

        try {
            // loading button
            setLoadingButton(true)
            const txHash = await allocateFund(address as Address, id)

            if (txHash) {
                setHash(txHash)
            }

        } catch (e) {
            console.log('project', e)
            setLoadingButton(false)
            toast.error("There was an error during create a project, try again in moment")
        }

    };

    return (
        <div className="flex flex-col gap-y-6 px-4 sm:px-10 py-10 bg-gray-300 shadow-xl rounded-sm bg-opacity-60 dark:bg-opacity-30">

            <div className="flex flex-col justify-between p-2 gap-2">
                <h2 className="font-bold text-2xl">Allocate fund </h2>
                <div className="grid grid-cols-2 border-b-2 border-gray-400 text-lg px-2">
                    <div>Fulfilled</div>
                    <div className="text-right font-semibold">{data?.percentage_fulfilled}</div>
                </div>
                <div className="grid grid-cols-2 border-b-2 border-gray-400 text-lg px-2">
                    <div>Total Amount</div>
                    <div className="flex justify-end text-right font-semibold">
                        {totalAmount}&nbsp;<BnbIcon addClassName=" " />
                    </div>
                </div>
            </div>

            <div className="flex relative">
                <ConnectButton
                    className={classNames({
                        'btn w-full block px-2 py-4 gap-x-2 text-xl text-center rounded-r-sm': true,
                        //'bg-opacity-50 pointer-events-none': !saleActive,
                        'flex justify-center': loadingButton
                    })}
                    address={address}
                    buttonText="Allocate"
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
        </div >
    )
}

export default Allocate