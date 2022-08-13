export default function keyOfArray(arr: Array<string>) {
    return arr.reduce((accumulator: Record<string, null>, current: string) => {
        return {
            ...accumulator,
            [current]: null,
        };
    }, {});
}
