export function calculateRemainingTime(timestamp: bigint | number): { days: string, hours: string, minutes: string, seconds: string } {
    // Convert BigInt timestamp to milliseconds
    const milliseconds = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;

    // Get current time in milliseconds
    const currentTime = new Date().getTime();

    // Calculate remaining time in milliseconds
    const remainingTime = milliseconds - currentTime;

    if (remainingTime < 1) {
        return {
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00'
        };
    }

    // Calculate remaining days, hours, minutes, and seconds
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    return {
        days: days ? days.toString().padStart(2, '0') : '00',
        hours: hours ? hours.toString().padStart(2, '0') : '00',
        minutes: minutes ? minutes.toString().padStart(2, '0') : '00',
        seconds: seconds ? seconds.toString().padStart(2, '0') : '00'
    };
}

export function getCurrentDate(date: Date = new Date()): string {
    return `${date.getDate()}.${date.getUTCMonth() + 1}.${date.getFullYear()}`;
}

export function addMonthDate(months: number, currentDate: Date): Date {
    const dateCopy = new Date(currentDate);
    dateCopy.setMonth(dateCopy.getMonth() + months);
    return dateCopy;
}

export function getEstimatedMonths(months: number, currentDate: Date = new Date()): string {
    const addMonth = addMonthDate(months, currentDate);
    return getCurrentDate(addMonth);
}

export function getStakeDate(date: number): string {
    const stakeDate = new Date(date * 1000);
    return getCurrentDate(stakeDate);
}

export function getStakeEstimatedMonths(month: number, date: number): string {
    const stakeDate = new Date(date * 1000);
    const addMonth = addMonthDate(month, stakeDate);
    return getCurrentDate(addMonth);
}

export function getTimeEstimatedMonths(month: number, currentDate: number): number {
    const stakeDate = new Date(currentDate * 1000);
    const addMonth = addMonthDate(month, stakeDate);
    return addMonth.getTime();
}
