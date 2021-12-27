import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import active from '../../helpers/active';
import isdefined from '../../helpers/isdefined';
import { Forms } from '../../redux/dispatcher';
interface NumberProps {
    addClass?: string,
    id: string,
    label?: string,
    name: string,
    formKey: string,
    icon: JSX.Element,
    invalidMsg: Array<string>,
    inputValue: Function,
    min?: number,
    max?: number,
    step?: number,
    defaultValue?: string
}
function Number({ addClass = 'col-md-6', id, label, name, formKey, icon, invalidMsg = [''], inputValue, min, max, step, defaultValue = '' }: NumberProps) {
    const [invMsg, setInvMsg] = useState(invalidMsg[0]);
    useEffect(() => {
        // => initialize invMsg state from invalidMsg prop
        setInvMsg(invalidMsg[0]);
    }, [invalidMsg]);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        Forms.setInputValue(formKey, name, e.target.value);
        // => if there is an error remove it when user writing
        if (invMsg.length > 0) {
            setInvMsg('');
        }
    }

    return (
        <div className={`form-group ${addClass}`}>
            {label ? <label htmlFor={id}>{label}</label> : ''}
            <input
                name={name}
                value={inputValue(formKey, name, defaultValue)}
                onChange={handleOnChange}
                type="number"
                min={min}
                max={max}
                step={step}
                className={active(invMsg.length !== 0, { activeClass: 'is-invalid', defaultClass: 'form-control' })}
            />
            {isdefined(icon, { trueReturn: icon })}
            <div id={`${id}feedback`} className="invalid-feedback">
                {invMsg}
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    inputValue: (key: string, name: string, defaultValue: string): string => {
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

export default connect(mapStateToProps)(Number);