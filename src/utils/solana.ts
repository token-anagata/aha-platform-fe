import { ENV_NETWORK } from "@/configurations/chains";
import { SOL_RECEPIENT } from "@/configurations/common";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { TransactionSignature } from "@solana/web3.js";
import { Transaction } from "@solana/web3.js";
import { Connection } from "node_modules/@web3modal/solana/dist/types/src/utils/scaffold";

export const transferSolana = async (
    address: PublicKey, amount: number,
    connection: Connection, sendTransaction:
        WalletAdapterProps['sendTransaction']
): Promise<TransactionSignature> => {
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: address,
            toPubkey: new PublicKey(SOL_RECEPIENT),
            lamports: amount * 1e9, // 1 SOL = 1,000,000,000 lamports
        })
    );
    const {
        //context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight }
    } = await connection.getLatestBlockhashAndContext();


    transaction.recentBlockhash = blockhash;
    transaction.feePayer = address;


    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

    return signature
};


export const getSolanaExplorer = (signature: TransactionSignature) : string => {
    const mainUrl = 'https://solscan.io/tx'

    if(ENV_NETWORK === 'testnet'){
        return `${mainUrl}/${signature}?cluster=devnet`;
    }

    return `${mainUrl}/${signature}`;
}