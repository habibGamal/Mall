
export default function isdefined(value: any, { trueReturn = '', falseReturn = '' }: { trueReturn?: any, falseReturn?: any }) {
    return value !== undefined ? trueReturn : falseReturn;
}