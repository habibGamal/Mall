import React from 'react'
import { connect } from 'react-redux'
import { Forms } from '../../redux/dispatcher';
function CheckBox({ label, addClass, name, formKey, id, value, dataset, inputValue}) {
    return (
        <div className={`form-check ${addClass}`}>
            <input className="form-check-input" name={name} value={value} data-set={dataset} checked={inputValue(formKey, id)} onChange={(e) => Forms.setInputValue(formKey, id, e.target.checked)} hidden type="checkbox" id={id} />
            <label className="form-check-label" htmlFor={id}>
                <span className="box">
                    <i className="fas fa-check" />
                </span>
                <span>
                    {label}
                </span>
            </label>
        </div>
    )
}

const mapStateToProps = (state) => ({
    inputValue: (key, name, defaultValue = false) => {
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

export default connect(mapStateToProps)(CheckBox);
