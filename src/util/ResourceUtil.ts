import { testData } from '../resources/testData';

export function getResource(name: string): string {
    const envValue = process.env[name];

    if (envValue !== undefined && envValue !== '') {
        return envValue;
    }

    const value = name.split('.').reduce<unknown>((current, key) => {
        if (current !== null && typeof current === 'object' && key in current) {
            return (current as Record<string, unknown>)[key];
        }

        return undefined;
    }, testData);

    if (typeof value !== 'string') {
        throw new Error(`resource was not found: ${name}`);
    }

    return value;
}