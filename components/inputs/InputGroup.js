import React, { useEffect, useState } from 'react'
import active from '../../helpers/active';
export default function InputGroup({ id, invalidMsg = [''], addClass, label, children }) {
    const [invMsg, setInvMsg] = useState(invalidMsg[0]);
    useEffect(() => {
        // => initialize invMsg state from invalidMsg prop
        setInvMsg(invalidMsg[0]);
    }, [invalidMsg]);

    // function handleOnChange(e) {
    //     Forms.setInputValue(formKey, name, e.target.value);
    //     // => if there is an error remove it when user writing
    //     if (invMsg.length > 0) {
    //         setInvMsg('');
    //     }
    // }
    return (
        <div className={addClass}>
            {label === null ? '' : <label>{label}</label>}
            <div className={active(invMsg.length !== 0, { activeClass: 'is-invalid' })}></div>
            {children}
            <div id={`${id}feedback`} className="invalid-feedback">
                {invMsg}
            </div>
        </div>
    )
}
