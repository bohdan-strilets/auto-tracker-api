export const minutesToMs = (minutes: number): number => minutes * 60 * 1000;

export const hoursToMs = (hours: number): number => minutesToMs(hours * 60);
