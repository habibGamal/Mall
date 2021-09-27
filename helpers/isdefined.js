export default function isdefined(value,{trueReturn,falseReturn}={}){
    falseReturn === undefined ? '':falseReturn;
    return value !== undefined ? trueReturn:falseReturn;
}