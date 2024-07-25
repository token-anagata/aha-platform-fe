import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useAccount } from '@/context/AccountContext';
import ArrowRightIcon from '@/assets/svg/ArrowRightIcon';
import SolanaIcon from '@/assets/svg/SolanaIcon';
import { WalletName } from '@solana/wallet-adapter-base';

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
        if (publicKey) setSolanaAddress(publicKey?.toBase58()!);
        onClose()
    }, [publicKey]);

    const handleWalletSelect = async (walletName: WalletName) => {
        console.log(walletName)
        //if (walletName) {
            try {
                select(walletName);
            } catch (error) {
                console.log("wallet connection err : ", error);
            }
        //}
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
                    <div className="flex min-h-96 md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="scroll-smooth max-w-96 max-h-screen relative transform overflow-auto rounded-lg bg-white dark:bg-gray-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-2">
                                        <Dialog.Title as="div" className="flex justify-center py-4 text-center text-lg m-auto w-32">
                                            <div className="rounded-full border-2 border-gray-400 p-4">
                                                <SolanaIcon addClassName="w-24 " />
                                            </div>
                                        </Dialog.Title>
                                        <div className="divide-y divide-gray-100">
                                            {wallets.map((wallet) => (
                                                <button
                                                    key={wallet.adapter.name}
                                                    //onClick={() => select(wallet.adapter.name)}
                                                    onClick={() => handleWalletSelect(wallet.adapter.name)}
                                                    className="flex justify-between gap-x-6 py-2 px-2 rounded-md hover:bg-gray-300 w-full items-center border-1 border-gray-500"
                                                >
                                                    <div className="flex">
                                                        <img
                                                            src={wallet.adapter.icon}
                                                            alt={wallet.adapter.name}
                                                            className="mr-5 w-12"
                                                        />
                                                    </div>
                                                    <div className="grow font-semibold text-left text-lg self-start">
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
