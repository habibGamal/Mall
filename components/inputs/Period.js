import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import active from '../../helpers/active';
import { Forms } from '../../redux/dispatcher';

function Period({ label, addClass, name, invalidMsg, formKey, inputValue }) {
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
        Forms.setInputValue(formKey, e.target.id, e.target.value);
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
                    <label htmlFor={`${name}-from`} className="col-4">From</label>
                    <input name={name} type="number" id={`${name}-from`} value={inputValue(formKey, `${name}-from`, '')} onChange={handleOnChange} min={1} step={1} max={12} className={active(invMsg.length !== 0, { activeClass: 'is-invalid', defaultClass: 'form-control col-6 offset-1' })} />
                    <div className="offset-1"></div>
                </div>
                <div className="form-group col-4">
                    <select name={name} id={`${name}-p1`} value={inputValue(formKey, `${name}-p1`, 'am')} onChange={handleOnChange} className="form-control" id="return">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-8 row align-items-center">
                    <label htmlFor={`${name}-to`} className="col-4">To</label>
                    <input name={name} type="number" id={`${name}-to`} value={inputValue(formKey, `${name}-to`, '')} onChange={handleOnChange} min={1} step={1} max={12} className={active(invMsg.length !== 0, { activeClass: 'is-invalid', defaultClass: 'form-control col-6 offset-1' })} />
                    <div className="offset-1"></div>
                </div>
                <div className="form-group col-4">
                    <select name={name} id={`${name}-p2`} value={inputValue(formKey, `${name}-p2`, 'pm')} onChange={handleOnChange} className="form-control">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                </div>
            </div>
            <div className={active(invMsg.length !== 0, { activeClass: 'is-invalid'})}></div>
            <div id={`${name}feedback`} className="invalid-feedback">
                {invMsg}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    inputValue: (key, name, defaultValue) => {
        // => key : represents form key in global store
        // => name : represents input name
        // => defaultValue : the value returnd if the input isn't registered yet in global state
        // => function return current value of particular input in particular form
        if (key !== undefined && name !== undefined) {
            // => check if the key an name is definded or not
            if (state.forms[key] !== undefined) {
                // => check if the key of the form is registered in the form state or not
                // => return the value if it is defined or default value if it's not
                return state.forms[key][name] === undefined ? defaultValue : state.forms[key][name];
            }
        }
        return defaultValue;
    }
})

export default connect(mapStateToProps)(Period);