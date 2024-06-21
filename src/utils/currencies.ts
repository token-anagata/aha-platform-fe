import { ResponseCurrencies } from "@/hooks/useCurrencies";

export const getRateCurrenciesByName = (currencies: ResponseCurrencies, name: string, ahaRate: number) : number => {
    if(currencies === undefined){
        return 0;
    } else if (name === 'eth') {
        return currencies['ethereum']['usd'];
    } else if (name === 'bnb') {
        return currencies['binancecoin']['usd'];
    } else if ( name === 'usdt') {
        return currencies['tether']['usd'];
    } else {
        return ahaRate;
    }
}