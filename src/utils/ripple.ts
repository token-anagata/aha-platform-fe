import { ENV_NETWORK } from '@/configurations/chains';
//import { XRP_RECEPIENT } from '@/configurations/common';
import { Client } from 'xrpl';

const NETWORK = ENV_NETWORK === 'testnet' ? 'wss://s.altnet.rippletest.net:51233' : 'wss://s1.ripple.com';

const client = new Client(NETWORK); // Server testnet Ripple

export const connect = async () => {
  await client.connect();
};

export const disconnect = async () => {
  await client.disconnect();
};

export const checkTransactionByHash = async (txHash: string) => {
    try {
      const txDetails = await client.request({
        command: 'tx',
        transaction: txHash
      });
      return txDetails.result;
    } catch (error) {
      console.error('Error checking transaction by hash:', error);
      return { error: 'Error checking transaction by hash' };
    }
  };