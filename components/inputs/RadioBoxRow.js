import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import active from '../../helpers/active';
import { Forms } from '../../redux/dispatcher';
function RadioBoxRow({ label, addClass, name, formKey, id, value, dataset, inputValue, selected, defaultValue = false }) {
    // => initialize the input with default value
    useEffect(() => {
        Forms.setInputValue(formKey, id, defaultValue);
    }, [])
    function onChange(e) {
        Forms.setInputValue(formKey, name, e.target.value);
    }
    return (
        <div className={active(selected, { defaultClass: 'radio-box-row' })}>
            <div className={`form-check ${addClass}`}>
                <input className="form-check-input" name={name} value={value} data-set={dataset} checked={inputValue(formKey, name) == value} onChange={onChange} hidden type="radio" id={id} />
                <label className={active(selected, { defaultClass: 'form-check-label' })} htmlFor={id}>
                    <span>{label}</span>
                    <span className="box">
                        <i className="fas fa-check" />
                    </span>
                </label>
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
        if (key && name) {
            // => check if the key an name is definded or not
            if (state.forms[key]) {
                // => check if the key of the form is registered in the form state or not
                // => return the value if it is defined or default value if it's not
                return state.forms[key][name] === undefined ? defaultValue : state.forms[key][name];
            }
        }
        return defaultValue;
    }
})

export default connect(mapStateToProps)(RadioBoxRow);
