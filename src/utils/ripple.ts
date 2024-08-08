import { ENV_NETWORK } from '@/configurations/chains';
//import { XRP_RECEPIENT } from '@/configurations/common';
import { BaseTransaction, Client } from 'xrpl';

interface Transaction extends BaseTransaction{
  Destination?: string;
  DeliverMax?: string;
}
export const XRP_DECIMALS = 10e5

const NETWORK = ENV_NETWORK === 'testnet' ? 'wss://s.altnet.rippletest.net:51233' : 'wss://s1.ripple.com';

const client = new Client(NETWORK); // Server testnet Ripple

export const connect = async () => {
  await client.connect();
};

export const disconnect = async () => {
  await client.disconnect();
};

export const checkTransactionByHash = async (txHash: string) : Promise<Transaction> => {
  await connect()
  const txDetails = await client.request({
    command: 'tx',
    transaction: txHash
  });

  return txDetails.result.tx_json;

};