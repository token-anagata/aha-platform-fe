import { formatInputNumberPoint } from "@/utils/number";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Address, Hash } from "viem";
import { useBalance, useChainId, useSendTransaction, useSwitchChain, useWaitForTransactionReceipt } from "wagmi";
import { ChainOpts } from "@/types/chain";
import ChainSelectBox, { CHAIN_OPTS } from "./Select/ChainSelectBox";
import classNames from "classnames";
import { DECIMALS, REAL_DECIMALS } from "@/utils/wagmi";
import { useMutation } from "@tanstack/react-query";
import { DonationType, usePostDonation } from "@/hooks/useDonation";
import { ResponseCurrencies, useCurrencies } from "@/hooks/useCurrencies";
import { getRateCurrenciesByName } from "@/utils/currencies";
import { formatDate } from "@/utils/date";
import { AHA_SYMBOL, USDT_SYMBOL } from "@/configurations/contract";
import { BNB_RECEPIENT, XRP_RECEPIENT } from "@/configurations/common";
import { donateToken } from "@/utils/wagmi/donation/writeContract";
import ConnectButton from "../Buttons/ConnectButton";
import SolanaButton from "../Buttons/SolanaButton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getSolanaExplorer, transferSolana } from "@/utils/solana";
import { TransactionSignature } from "@solana/web3.js";
import { XRP_DECIMALS, checkTransactionByHash } from "@/utils/ripple";
import CopyIcon from "@/assets/svg/CopyIcon";
import { copyToClipboard } from "@/utils/copyToClipboard";

interface DonationProps {
    id: string;
    address: string | undefined;
    tokenPrice: BigInt;
    setRefetch: Dispatch<SetStateAction<boolean>>;
}

const Donation: React.FC<DonationProps> = ({ id, address, tokenPrice, setRefetch }) => {
    const [donation, setDonation] = useState<string>('')
    const [chain, setChain] = useState<ChainOpts>(CHAIN_OPTS[0])
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [xrpHash, setXrpHash] = useState<string>('');
    const [confirmedXrp, setConfirmedXrp] = useState<boolean>(false);
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
    const { sendTransactionAsync } = useSendTransaction();
    const { data: balance } = useBalance({ address: address as Address });
    const { switchChainAsync } = useSwitchChain();
    const { publicKey, sendTransaction: sendTransactionSolana } = useWallet();
    const { connection } = useConnection();
    const chainId = useChainId()
    const [hash, setHash] = useState<Hash | undefined>(undefined)
    const [trxSignature, setTrxSignature] = useState<TransactionSignature | undefined>(undefined)
    const { isLoading: loadingTransaction, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: hash,
    });
    const { data: dataCurrencies } = useCurrencies()
    const { mutate } = useMutation({
        mutationFn: (data: DonationType) => {
            return usePostDonation(data)
        },
        onSuccess: () => {
            setLoadingButton(false)
        }
    });

    useEffect(() => {
        if (!isConfirmed) return

        toast.success(`Your donation has been successfully sent. Thank you very much, the help you have given means a lot to us and the world`);
        setLoadingButton(false)
    }, [isConfirmed, trxSignature])

    useEffect(() => {
        (async () => {
            const donate = Number(donation.replace(/,/g, ''))
            const formatTokenPrice: number = Number(tokenPrice) / Number(DECIMALS)
            const rate = getRateCurrenciesByName(dataCurrencies as ResponseCurrencies, chain.value, formatTokenPrice)
            const usdRate = donate * rate;
            const data: DonationType = {
                donation_id: '',
                donation_date: formatDate(),
                project_id: id,
                wallet_id: address as string,
                donation_currency: chain.value,
                donation_value: donate,
                conversion_currency: "usd",
                conversion_value: usdRate,
                status: 1,
            }

            if (hash || trxSignature || confirmedXrp) {
                if (chain.value === 'sol') {
                    data.donation_id = trxSignature as string
                    data.donation_currency = 'solana'
                } else if (chain.value === 'xrp') {
                    const dataXrp = await checkTransactionByHash(xrpHash)
                
                    if(dataXrp && dataXrp?.Destination !== XRP_RECEPIENT){
                        toast.warning('Tx hash not valid')
                        return
                    }
                    const rateXrp = getRateCurrenciesByName(dataCurrencies as ResponseCurrencies, chain.value, formatTokenPrice)
                    const xrpValue = Number(dataXrp.DeliverMax) / XRP_DECIMALS
                    const usdRateXrp = Number(xrpValue) * rateXrp;

                    data.donation_id = xrpHash
                    data.wallet_id =  dataXrp.Account as string
                    data.donation_value = xrpValue
                    data.conversion_value = usdRateXrp
                } else {
                    data.donation_id = hash as string
                }
                
                mutate(data)
                setRefetch(true)
            }
        })()
    }, [hash, trxSignature, confirmedXrp, dataCurrencies])

    const handleDonation = async (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): Promise<void> => {
        e.preventDefault();

        const donate = Number(donation.replace(/,/g, ''))
     
        if(!['sol', 'xrp'].includes(chain.value)){
            if (chainId !== chain.id) {
                await switchChainAsync({ chainId: chain.id });
                
                return
            }
            
            if (Number(balance?.value) < 10 ) {
                toast.warning(`Your BNB is lower than 10 wei please top up your BNB because gas fee is required to pay for the computational effort needed to process the transaction`)
                
                return
            }
        }

        try {
            // loading button
            setLoadingButton(true)
            if (chain.value === 'eth' || chain.value === 'bnb') {
                const txHash = await sendTransactionAsync({
                    to: chain.recipient as Address,
                    value: BigInt(donate * 10 ** REAL_DECIMALS), // Convert to wei
                })

                if (txHash) {
                    setHash(txHash)
                }
            } else if (chain.value === 'usdt') {
                const txHashUsdt = await donateToken(address as Address, donate, USDT_SYMBOL, BNB_RECEPIENT)

                if (txHashUsdt) {
                    setHash(txHashUsdt)
                }
            } else if (chain.value === 'aha') {
                const txHashAha = await donateToken(address as Address, donate, AHA_SYMBOL, BNB_RECEPIENT)

                if (txHashAha) {
                    setHash(txHashAha)
                }
            } else if (chain.value === 'sol') {
                if (!publicKey) {
                    toast.error('Solana wallet not connected');
                    return;
                }

                const signature = await transferSolana(publicKey, donate, connection, sendTransactionSolana)

                if (signature) {
                    setTrxSignature(signature)
                    setLoadingButton(false)
                    toast.success(`Your donation has been successfully sent. Thank you very much, the help you have given means a lot to us and the world`);
                }
            } else if (chain.value === 'xrp') {
                setConfirmedXrp(true)
            }

        } catch (e) {
            console.log('transfer', e)
            setLoadingButton(false)
            toast.error("There was an error during transfer, try again in moment")
        }

    };

    const handleChangeDonation = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;

        // Remove commas for validation
        const numericValue = value.replace(/,/g, '')

        // Check if the input is a valid number (including decimal point)
        if (/^\d*\.?\d*$/.test(numericValue)) {
            const sanitizedValue = numericValue.replace(/^0+(?!$|\.)/, '');

            const numberValue = parseFloat(sanitizedValue);
            if (!isNaN(numberValue) || sanitizedValue === '') {
                const formattedAmount: string = formatInputNumberPoint(sanitizedValue);
                setDonation(formattedAmount);
            }
        }
    };

    const handleKeyDownAmount = (e: React.KeyboardEvent<HTMLInputElement>): void => {
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

    const handleSwitchChain = async (chainValue: ChainOpts) => {
        setChain(chainValue)
    };

    const handleCopyClick = () => {
        copyToClipboard(XRP_RECEPIENT);

        setTooltipVisible(true);
        setTimeout(() => {
            setTooltipVisible(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col space-y-6 py-6">
            <div className="relative">
                <ChainSelectBox onChange={handleSwitchChain} />
            </div>
            {chain.value !== 'xrp' && <div className="relative">
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
            </div>}

            {chain.value === 'xrp' && <div className="relative">
                <ol className="list-decimal px-5">
                    <li>Open Your wallet</li>
                    <li>
                        <div className="flex">
                            Transfer to&nbsp;<strong>{XRP_RECEPIENT}</strong>
                            <CopyIcon addClassName="web-inspector-hide-shortcut" onClick={handleCopyClick} />
                            {tooltipVisible && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-sm rounded">
                                    Copied!
                                </div>
                            )}
                        </div>
                    </li>
                    <li>Copy transaction hash and enter it into the input below</li>
                    <li>Donate</li>
                </ol>
            </div>}

            {chain.value === 'xrp' && <div className="relative">
                <div className="absolute right-0 inset-y-0 flex items-center p-2 font-bold text-lg">
                    <p className="uppercase">{chain.value}</p>&nbsp; {chain.icon}
                </div>
                <input
                    className="appearance-none border py-4 pl-4 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200 focus:placeholder-gray-600 transition rounded-sm w-full outline-none"
                    type="text"
                    value={xrpHash}
                    onChange={(e) => setXrpHash(e.target.value)}
                    placeholder="66C77BC95E8..."
                />
            </div>}

            <div className="relative">
                {
                    chain.value === 'sol' && (
                        <SolanaButton
                            className={classNames({
                                'btn w-full block px-2 py-4 gap-x-2 text-xl text-center rounded-r-sm': true,
                                //'bg-opacity-50 pointer-events-none': !saleActive,
                                'flex justify-center': loadingButton
                            })}
                            buttonText="Donate"
                            loadingButton={loadingButton}
                            handleClick={handleDonation}
                        />
                    )
                }
                {
                    chain.value !== 'sol' && (
                        <ConnectButton
                            className={classNames({
                                'btn w-full block px-2 py-4 gap-x-2 text-xl text-center rounded-r-sm': true,
                                //'bg-opacity-50 pointer-events-none': !saleActive,
                                'flex justify-center': loadingButton
                            })}
                            address={address}
                            buttonText="Donate"
                            loadingButton={loadingButton}
                            handleClick={handleDonation}
                        />
                    )
                }
            </div>

            {loadingTransaction && (<div className="relative">
                <p className="text-center">Waiting for transaction to be confirmed...</p>
            </div>)}
            {isConfirmed && (<div className="relative">
                <p className="truncate text-center">
                    Tx Hash:  <a className="text-aha-green-light text-ellipsis" target="_blank" href={`${chain.explorer}/tx/${hash}`}>{hash}</a>
                </p>
            </div>)}
            {trxSignature && (<div className="relative">
                <p className="truncate text-center">
                    Signature:  <a className="text-aha-green-light text-ellipsis" target="_blank" href={getSolanaExplorer(trxSignature)}>{trxSignature}</a>
                </p>
            </div>)}
        </div>
    )
}

export default Donation