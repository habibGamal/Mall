import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Forms } from '../../redux/dispatcher';
import SelectOption from '../../types/SelectOpiton';
interface SelectProps {
    addClass?: string,
    id: string,
    label?: string,
    name: string,
    formKey: string,
    invalidMsg?: Array<string>,
    inputValue: Function,
    options: Array<SelectOption>,
    defaultOption?: number
}
function Select({ addClass = 'col-md-6', id, label, name, formKey, invalidMsg = [''], inputValue, options, defaultOption = 0 }: SelectProps) {
    const [invMsg, setInvMsg] = useState(invalidMsg[0]);
    useEffect(() => {
        // => initialize invMsg state from invalidMsg prop
        setInvMsg(invalidMsg[0]);
    }, [invalidMsg]);
    useEffect(() => {
        Forms.setInputValue(formKey, name, options[defaultOption ?? 0]?.value);
    }, []);
    function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
        Forms.setInputValue(formKey, name, e.target.value);
        // => if there is an error remove it when user writing
        if (invMsg.length > 0) {
            setInvMsg('');
        }
    }
    return (
        <div className={`form-group ${addClass}`}>
            {label ? <label htmlFor={id}>{label}</label> : ''}
            <select
                name={name}
                className="form-control" id={id}
                value={inputValue(formKey, name, options[defaultOption]?.value)}
                onChange={handleOnChange}
            >
                {options.map((option, i) => <option key={i} value={option.value}>{option.as}</option>)}
            </select>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    inputValue: (key: string, name: string, defaultValue: number): number => {
        // => key : represents form key in global store
        // => name : represents input name
        // => defaultValue : the value returnd if the input isn't registered yet in global state
        // => function return current value of particular input in particular form
        if (key && name) {
            // => check if the key an name is definded or not
            if (state.forms[key]) {
                // => check if the key of the form is registered in the form state or not
                // => return the value if it is defined or default value if it's not
                return state.forms[key][name] ? state.forms[key][name] : defaultValue;
            }
        }
        return defaultValue;
    }
})

export default connect(mapStateToProps)(Select);