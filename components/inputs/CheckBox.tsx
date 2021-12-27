import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Forms } from '../../redux/dispatcher';
interface CheckBoxProps {
    label: string,
    addClass: string,
    name: string,
    formKey: string,
    id: string,
    value: string,
    dataset?: string,
    inputValue: Function,
    defaultValue?: boolean
}
function CheckBox({ label, addClass, name, formKey, id, value, dataset, inputValue, defaultValue = false }: CheckBoxProps) {
    // => initialize the input with default value
    useEffect(() => {
        Forms.setInputValue(formKey, id, defaultValue);
    }, [])
    return (
        <div className={`form-check ${addClass}`}>
            <input className="form-check-input" name={name} value={value} data-set={dataset} checked={inputValue(formKey, id, defaultValue)} onChange={(e) => Forms.setInputValue(formKey, id, e.target.checked)} hidden type="checkbox" id={id} />
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

const mapStateToProps = (state: any) => ({
    inputValue: (key: string, name: string, defaultValue: boolean): boolean => {
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

export default connect(mapStateToProps)(CheckBox);
