import SpinIcon from "@/assets/svg/SpinIcon";
import { OpenParams } from "@/types/account";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import classNames from "classnames";
import { MouseEvent } from "react";

interface ConnectButtonProps {
    address: string | undefined;
    className: string;
    loadingButton: boolean;
    buttonText: string | React.ReactElement;
    handleClick: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ address, className, buttonText, loadingButton, handleClick }) => {
    const { open } = useWeb3Modal();

    const handleConnect = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        e.preventDefault();
        if (address) {
            open({ view: "Account" } as OpenParams);
        } else {
            open({ view: "Connect" } as OpenParams);
        }
    };

    return (
        <button
            className={className}
            disabled={loadingButton}
            onClick={address ? handleClick : handleConnect}
        >
            {
                loadingButton ? (
                    <SpinIcon
                        addClassName={classNames({
                            'w-8 h-8': true,
                            'animate-spin': loadingButton
                        })}
                    /> 
                ) : (address ? buttonText : "Connect")
            } {loadingButton && 'Processing'}
        </button>
    )
}

export default ConnectButton