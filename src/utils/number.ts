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
* Formats the input number with commas for thousands separators. 
* This function to support decimal points, we can split the input string into integer and decimal parts, 
* @param {number} num - The number to format.
* @returns {string} - The formatted number as a string.
*/
export const formatInputNumberPoint = (num: string): string => {
    if (isNaN(parseFloat(num))) {
        return '';
    }

    const parts = num.split('.');
    const isNegative = parts[0].startsWith('-');
    if (isNegative) {
        parts[0] = parts[0].substring(1);
    }

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let formattedNumber = parts.join('.');

    if (isNegative) {
        formattedNumber = '-' + formattedNumber;
    }

    return formattedNumber;
};

/**
* Formats the input number with divide token decimal.
* @param {Bigint} num - The number to format.
* @returns {number} - The formatted number as a number.
*/
export const formatToken = (num: BigInt): number => {
    return Number(num) / Number(DECIMALS);
};