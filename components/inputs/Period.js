import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import active from '../../helpers/active';
import { Forms } from '../../redux/dispatcher';
import Time from './Time';

function Period({ label, addClass = 'col-md-6', name, invalidMsg, formKey }) {
    const [invMsg, setInvMsg] = useState(invalidMsg);
    useEffect(() => {
        // => initialize invMsg state from invalidMsg prop and renew it
        setInvMsg(invalidMsg);
    }, [invalidMsg]);
    function handleOnChange(e) {
        Forms.setInputValue(formKey, e.target.id, e.target.value);
        // => if there is an error remove it when user writing
        if (e.target.id === `${name}-from`) {
            if (invMsg['from'].length > 0) {
                setInvMsg(old => ({ ...old, from: '' }));
            }
        }
        if (e.target.id === `${name}-from`) {
            if (invMsg['to'].length > 0) {
                setInvMsg(old => ({ ...old, to: '' }));
            }
        }
    }
    return (
        <div className={`form-group ${addClass}`}>
            <label>{label}</label>
            <Time
                label="From"
                name={name}
                id={`${name}-from`}
                formKey={formKey}
                invMsg={invMsg.from}
                handleOnChange={handleOnChange}
            />
            <Time
                label="To"
                name={name}
                id={`${name}-to`}
                formKey={formKey}
                invMsg={invMsg.to}
                handleOnChange={handleOnChange}
            />
            <div className={active(invMsg.length !== 0, { activeClass: 'is-invalid' })}></div>
            {/* <div id={`${name}feedback`} className="invalid-feedback">
                {invMsg}
            </div> */}
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