import React from 'react'
import { connect } from 'react-redux';
import active from '../../helpers/active'

function Time({ label, name, formKey, handleOnChange, invMsg, inputValue, id }) {
    return (
        <div className="form-row">
            <div className="form-group col-8 row align-items-center">
                <label htmlFor={id} className="col-4">{label}</label>
                <input name={name} type="number" id={id} value={inputValue(formKey, id, '')} onChange={handleOnChange} min={1} step={1} max={12} className={active(invMsg.length !== 0, { activeClass: 'is-invalid', defaultClass: 'form-control col-6 offset-1' })} />
                <div className="offset-1"></div>
                <div id={`${id}feedback`} className="invalid-feedback ml-3">
                    {invMsg}
                </div>
            </div>
            <div className="form-group col-4">
                <select name={name} id={`${id}-per`} value={inputValue(formKey, `${id}-per`, 'am')} onChange={handleOnChange} className="form-control">
                    <option value="am">AM</option>
                    <option value="pm">PM</option>
                </select>
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

export default connect(mapStateToProps)(Time);