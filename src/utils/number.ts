import { DECIMALS } from "./wagmi";

/**
* Formats a number to a specified number of decimal places with optional comma separators.
* @param {number} value - The number to format.
* @param {number} minDecimals - The minimum number of decimal places.
* @param {number} maxDecimals - The maximum number of decimal places.
* @returns {string} - The formatted number as a string.
*/
export function formatNumber(value: number, minDecimals: number, maxDecimals: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: maxDecimals,
    });

    return formatter.format(value);
}
/**
* Formats the input number with commas for thousands separators.
* @param {number} num - The number to format.
* @returns {string} - The formatted number as a string.
*/
export const formatInputNumber = (num: string): string => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
* Formats the input number with divide token decimal.
* @param {Bigint} num - The number to format.
* @returns {number} - The formatted number as a number.
*/
export const formatToken = (num: BigInt): number => {
    return Number(num) / Number(DECIMALS);
};