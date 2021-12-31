import React, { useEffect, useState } from 'react'
import active from '../../helpers/active';
interface InputGroupProps {
    id: string,
    invalidMsg: Array<string>,
    addClass?: string,
    label?: string,
    children: JSX.Element | Array<JSX.Element>
}
export default function InputGroup({ id, invalidMsg = [''], addClass, label, children }: InputGroupProps) {
    const [invMsg, setInvMsg] = useState(invalidMsg[0]);
    useEffect(() => {
        // => initialize invMsg state from invalidMsg prop
        setInvMsg(invalidMsg[0]);
    }, [invalidMsg]);

    return (
        <div className={addClass}>
            {label ? <label>{label}</label> : ''}
            <div className={active(invMsg.length !== 0, { activeClass: 'is-invalid' })}></div>
            {children}
            <div id={`${id}feedback`} className="invalid-feedback">
                {invMsg}
            </div>
        </div>
    )
}
