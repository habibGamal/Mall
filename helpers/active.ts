export default function active(
    check: boolean | null | undefined,
    { activeClass = 'active', defaultClass = '', falseClass = '' }: { activeClass?: string, defaultClass?: string, falseClass?: string } = {}
) {
    return check ? `${defaultClass} ${activeClass}` : `${defaultClass} ${falseClass}`
}