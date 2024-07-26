import SpinIcon from "@/assets/svg/SpinIcon";
import classNames from "classnames";
import { MouseEvent, useState } from "react";
import ModalWallet from "../Modal/ModalWallet";
import { useAccount } from "@/context/AccountContext";
import LogoutIcon from "@/assets/svg/LogoutIcon";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ENV_NETWORK } from "@/configurations/chains";

interface SolanaButtonProps {
    className: string;
    loadingButton: boolean;
    buttonText: string;
    handleClick: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const SolanaButton: React.FC<SolanaButtonProps> = ({ className, buttonText, loadingButton, handleClick }) => {
    const [modalSolana, setModalSolana] = useState<boolean>(false)
    const { removeSolanaAddress } = useAccount()
    const { publicKey, disconnect } = useWallet()
    const { connection } = useConnection();

    const handleConnect = async (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): Promise<void> => {
        console.log(e)
        setModalSolana(true)
    }

    const handleDisconnect = async (e: MouseEvent<SVGSVGElement>): Promise<void> => {
        console.log(e)
        disconnect()
        removeSolanaAddress();
    }

    const requestAirdrop = async () => {
        if (!publicKey) {
            console.log('Wallet not connected');
            return;
        }

        try {
            const airdropSignature = await connection.requestAirdrop(publicKey, 2e9); // 2 SOL
            await connection.confirmTransaction(airdropSignature, 'confirmed');
        } catch (error) {
            console.error('Airdrop failed', error);
        }
    };

    const handleCloseModalSolana = () => setModalSolana(false)

    return (
        <>
            <button
                className={className}
                disabled={loadingButton}
                onClick={publicKey ? handleClick : handleConnect}
            >
                {
                    loadingButton ? (
                        <SpinIcon
                            addClassName={classNames({
                                'w-8 h-8': true,
                                'animate-spin': loadingButton
                            })}
                        />
                    ) : (publicKey ? buttonText : "Connect")
                }
            </button>

            {/* {
                ENV_NETWORK === 'testnet' && (
                    <button
                        className="btn w-full block px-2 py-4 gap-x-2 text-xl text-center rounded-r-sm bg-blue-600 mt-2"
                        onClick={requestAirdrop}
                    >
                        Claim
                    </button>
                )
            } */}

            <div className="text-sm text-center py-4">
                <p className="flex justify-center font-semibold truncate">
                    {publicKey ? 'Connected Solana' : 'Not Connected'}&nbsp;
                    {publicKey && <LogoutIcon addClassName="w-4 cursor-pointer" onClick={handleDisconnect} />}
                </p>
                <p className="font-normal truncate">{publicKey?.toBase58()!}</p>

            </div>
            <ModalWallet
                isOpen={modalSolana}
                onClose={handleCloseModalSolana}
            />
        </>
    )
}

export default SolanaButton