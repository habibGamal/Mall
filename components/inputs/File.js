import React, { useEffect, useState } from 'react'
import active from '../../helpers/active';

export default function File({addClass,id,label,name,multiple,onChange,invalidMsg}) {
    
    if (addClass === undefined) {
        addClass = 'col-md-6';
    }
    if (invalidMsg === undefined) {
        invalidMsg = [''];
    }
    const [invMsg, setInvMsg] = useState(invalidMsg[0]);
    useEffect(() => {
        // => initialize invMsg state from invalidMsg prop
        setInvMsg(invalidMsg[0]);
    }, [invalidMsg]);

    return (
        <div className={`form-group ${addClass}`}>
            <label htmlFor={id}>{label}
                <div className="plus">
                    <i className="fas fa-upload" />
                </div>
            </label>
            <input onChange={onChange} name={name} type="file" multiple={multiple} hidden className={active(invalidMsg.length !== 0, { activeClass: 'is-invalid', defaultClass: 'form-control-file' })} id={id} />
            <div id={`${id}feedback`} className="invalid-feedback">
                {invMsg}
            </div>
        </div>
    )
}