export const APR: number[][] = [
    [0.0025, 0.0075, 0.015, 0.03, 0.045, 0.06], // 20,000 - 25,000
    [0.0025, 0.0150, 0.030, 0.06, 0.090, 0.12], // 25,000 - 50,000
    [0.0025, 0.0150, 0.045, 0.09, 0.135, 0.18], // 50,000 - 125,000
    [0.0025, 0.0150, 0.045, 0.12, 0.180, 0.24], // 125,000 - 250,000
    [0.0025, 0.0150, 0.045, 0.12, 0.225, 0.30], // 250,000 - 500,000
    [0.0025, 0.0150, 0.045, 0.12, 0.225, 0.36] // >= 500,000
];

export const MIN_AMOUNT: number[] = [
    20000, 25000, 50000,
    125000, 250000, 500000
];

export const MAX_AMOUNT: number[] = [
    25000, 50000, 125000,
    250000, 500000, Number.MAX_SAFE_INTEGER
];

export const STAKE_MONTH: string[] = ['1', '3', '6', '12', '18', '24'];

export function getIndex(amount: number): number {
    for (let i = 0; i < MIN_AMOUNT.length; i++) {
        if (amount >= MIN_AMOUNT[i] && amount < MAX_AMOUNT[i]) {
            return i;
        }
    }
    return -1;
}

export function getApr(stakeAmount: number, stakeMonth: string): number {
    const index = getIndex(stakeAmount);

    if (index === -1) {
        return 0;
    }

    for (let i = 0; i < STAKE_MONTH.length; i++) {
        if (STAKE_MONTH[i] === stakeMonth) {
            return APR[index][i];
        }
    }

    return 0;
}

export function getCalculateApr(amount: number, duration: string): number {
    const apr = getApr(amount, duration);

    if (apr >= 0) {
        const total = amount * apr;

        return total;
    }

    return 0;
}
