
interface Metadata {
    name: string;
    description: string;
    url: string;
    icons: string[];
}

export const PROJECT_ID = import.meta.env.VITE_WEB3MODAL_PROJECT_ID as string;

export const metadata: Metadata = {
    name: 'AHA Web3Modal',
    description: 'AHA Wallet Modal',
    url: 'https://project-anagata.io',
    icons: ['https://project-anagata.io/img/AHAWhite.png']
};