import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useAccount } from '@/context/AccountContext';
import ArrowRightIcon from '@/assets/svg/ArrowRightIcon';

interface ModalWalletProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalWallet: React.FC<ModalWalletProps> = ({ isOpen, onClose, }) => {
    const { connection } = useConnection();
    const { select, wallets, publicKey } = useWallet();
    const { setSolanaAddress } = useAccount();

    useEffect(() => {
        if (!connection || !publicKey) {
            return;
        }


    }, [publicKey, connection]);

    useEffect(() => {
        console.log(publicKey)
        if(publicKey) setSolanaAddress(publicKey?.toBase58()!);
        onClose()
    }, [publicKey]);

    const handleWalletSelect = async (walletName: any) => {
        if (walletName) {
            try {
                select(walletName);
            } catch (error) {
                console.log("wallet connection err : ", error);
            }
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose} autoFocus={true}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="scroll-smooth max-h-screen relative transform overflow-auto rounded-lg bg-white dark:bg-gray-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                                <div>
                                    <div className="mt-3 sm:mt-5">
                                        <Dialog.Title as="h3" className="text-center text-lg leading-6 font-bold text-gray-900 dark:text-gray-200">
                                            Solana Wallet
                                        </Dialog.Title>
                                        <div className="divide-y divide-gray-100">
                                            {wallets.map((wallet) => (
                                                <button
                                                    key={wallet.adapter.name}
                                                    //onClick={() => select(wallet.adapter.name)}
                                                    onClick={() => handleWalletSelect(wallet.adapter.name)}
                                                    className="flex justify-between gap-x-6 py-5 hover:bg-transparent w-full items-center border-1 border-gray-500"
                                                >
                                                    <div className="flex">
                                                        <img
                                                            src={wallet.adapter.icon}
                                                            alt={wallet.adapter.name}
                                                            height={30}
                                                            width={30}
                                                            className="mr-5 "
                                                        />
                                                    </div>
                                                    <div className="text-lg">
                                                        {wallet.adapter.name}
                                                    </div>
                                                    <div className='text-gray-600 text-xl'>
                                                        <ArrowRightIcon addClassName='' color='#798686' />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-aha-green-light px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-aha-green-dark focus:outline-none focus:ring-2 focus:ring-aha-green-dark focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ModalWallet;
