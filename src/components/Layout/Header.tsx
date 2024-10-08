import LightSunIcon from "@/assets/svg/LightSunIcon";
import NightMoonIcon from "@/assets/svg/NightMoonIcon";
import WalletIcon from "@/assets/svg/WalletIcon";
import { useDarkMode } from "@/context/DarkModeContext";
import { MouseEvent } from "react";

interface HeaderProps {
    address: string | undefined;
    handleConnect: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ handleConnect, address }) => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <header className={`w-full bg-transparent sm:pt-6 py-3 sm:pb-4 sm:px-8 px-2 flex justify-between items-center border-b-2 dark:border-gray-600/50`}>

            <nav>
                <a href="/" className="">
                    <img src={ darkMode? '/aha-logo-white.png' : '/aha-logo.png'} alt="Aha Logo" className="w-40 sm:w-40 h-20 py-2 -mt-3 -mb-1 sm:-my-8" />
                </a>
            </nav>

            <nav className="flex space-x-4">

                <div onClick={toggleDarkMode}>
                    {darkMode ? <LightSunIcon addClassName="hover:bg-gray-700 rounded-lg p-1" /> : <NightMoonIcon addClassName="hover:bg-gray-200 rounded-lg p-1" />}
                </div>

                <button className="border-2 border-aha-green-dark dark:border-aha-green-lighter px-2 sm:py-1 rounded-xl text-sm" onClick={handleConnect} >
                    <span className="flex items-center space-x-2">
                        <span>{address ? `${address.slice(0, 6)}........${address.slice(address.length - 4, address.length)}`.toLowerCase() : 'Connect to wallet'}</span>
                        <WalletIcon addClassName="w-5 h-5" />
                    </span>
                </button>
            </nav>
        </header>
    )
}

export default Header