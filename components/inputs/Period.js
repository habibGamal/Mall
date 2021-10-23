import React, { useEffect, useState } from 'react'

export default function Period({ label, addClass, name ,invalidMsg }) {
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

    function handleOnChange(e) {
        Forms.setInputValue(formKey, name, e.target.value);
        // => if there is an error remove it when user writing
        if (invMsg.length > 0) {
            setInvMsg('');
        }
    }
    return (
        <div className={`form-group ${addClass}`}>
            <label>{label}</label>
            <div className="form-row">
                <div className="form-group col-8 row align-items-center">
                    <label className="col-4">From</label>
                    <input name={name} type="number" min={1} step={1} max={12} className="form-control col-6 offset-1" />
                    <div className="offset-1"></div>
                </div>
                <div className="form-group col-4">
                    <select name={name} className="form-control" id="return">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-8 row align-items-center">
                    <label className="col-4">To</label>
                    <input name={name} type="number" min={1} step={1} max={12} className="form-control col-6 offset-1" />
                    <div className="offset-1"></div>
                </div>
                <div className="form-group col-4">
                    <select name={name} className="form-control">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
