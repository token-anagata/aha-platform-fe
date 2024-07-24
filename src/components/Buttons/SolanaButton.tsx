import SpinIcon from "@/assets/svg/SpinIcon";
import classNames from "classnames";
import { MouseEvent, useState } from "react";
import ModalWallet from "../Modal/ModalWallet";
import { useAccount } from "@/context/AccountContext";

interface SolanaButtonProps {
    className: string;
    loadingButton: boolean;
    buttonText: string;
    handleClick: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const SolanaButton: React.FC<SolanaButtonProps> = ({ className, buttonText, loadingButton, handleClick }) => {
    const [modalSolana, setModalSolana] = useState<boolean>(false)
    const { solanaAddress } = useAccount()

    const handleConnect = async (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): Promise<void> => {
        console.log(e)
        setModalSolana(true)
    }

    const handleCloseModalSolana = () => setModalSolana(false)

    return (
        <>
            <button
                className={className}
                disabled={loadingButton}
                onClick={solanaAddress ? handleClick : handleConnect}
            >
                {
                    loadingButton ? (
                        <SpinIcon
                            addClassName={classNames({
                                'w-8 h-8': true,
                                'animate-spin': loadingButton
                            })}
                        />
                    ) : (solanaAddress ? buttonText : "Connect")
                }
            </button>

            <div className="text-sm text-center py-4">
                <p className="font-semibold">Connected Solana</p>
                <p className="font-normal">{solanaAddress}</p>
            </div>
            <ModalWallet
                isOpen={modalSolana}
                onClose={handleCloseModalSolana}
            />
        </>
    )
}

export default SolanaButton