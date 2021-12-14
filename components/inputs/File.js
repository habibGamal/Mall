import React, { useEffect, useState } from 'react'
import active from '../../helpers/active';

export default function File({ addClass = 'col-md-6', id, label, name, multiple, onChange, invalidMsg = [''] }) {
    const [invMsg, setInvMsg] = useState(invalidMsg[0]);
    useEffect(() => {
        // => initialize invMsg state from invalidMsg prop
        setInvMsg(invalidMsg[0]);
    }, [invalidMsg]);

    function onClick(e) {
        // => to clear the input before insert the file , as it could be the same file (and user delete it from global store by accedent)
        e.target.value = null;
    }

    function onChangeFile(e) {
        onChange(e);
        // => if there is an error remove it when user click on the input
        if (invMsg.length > 0) {
            setInvMsg('');
        }
    }
    return (
        <div className={`form-group ${addClass}`}>
            <label htmlFor={id}>{label}
                <div className="plus">
                    <i className="fas fa-upload" />
                </div>
            </label>
            <input onChange={onChangeFile} onClick={onClick} name={name} type="file" multiple={multiple} hidden className={active(invalidMsg.length !== 0, { activeClass: 'is-invalid', defaultClass: 'form-control-file' })} id={id} />
            <div id={`${id}feedback`} className="invalid-feedback ml-4">
                {invMsg}
            </div>
        </div>
    )
}