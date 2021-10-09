import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import active from '../../helpers/active';
import isdefined from '../../helpers/isdefined';
import { setInputValue } from '../../redux/actions/form';
function Input({ name, id, label, type, options, min, icon, invalidMsg, formKey, parentId,addClass, onChange, inputValue, setInputValue }) {
    // const [value, setValue] = useState('init');
    if (addClass === undefined) {
        addClass = 'col-md-6';
    }
    if (invalidMsg === undefined) {
        invalidMsg = '';
    }
    const [invMsg, setInvMsg] = useState(invalidMsg);
    useEffect(() => {
        // => initialize invMsg state from invalidMsg prop
        setInvMsg(invalidMsg);
    }, [invalidMsg]);
    function handleOnChange(e) {
        setInputValue(formKey, name, e.target.value);
        // => if there is an error remove it when user writing
        if (invMsg.length > 0) {
            setInvMsg('');
        }
    }
    switch (type) {
        case 'file':
            return (
                <div className={`form-group ${addClass}`}>
                    <label htmlFor={id}>{label}
                        <div className="plus">
                            <i className="fas fa-upload" />
                        </div>
                    </label>
                    <input onChange={onChange} name={name} type="file" multiple hidden className={active(invalidMsg.length !== 0, { activeClass: 'is-invalid', defaultClass: 'form-control-file' })} id={id} />
                    <div id={`${id}feedback`} className="invalid-feedback">
                        {invalidMsg}
                    </div>
                </div>
            )
        case 'period':
            return (
                <div className={`form-group ${addClass}`}>
                    <label htmlFor="return">{label}</label>
                    <div className="form-row justify-content-between">
                        <div className="form-group col-md-4 row align-items-center">
                            <label htmlFor="productName" className="col">From</label>
                            <input type="number" className="form-control col" />
                        </div>
                        <div className="form-group col-2">
                            <select className="form-control" id="return">
                                <option>AM</option>
                                <option>PM</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4 row align-items-center">
                            <label htmlFor="productName" className="col">To</label>
                            <input type="number" className="form-control col" />
                        </div>
                        <div className="form-group col-2">
                            <select className="form-control" id="return">
                                <option>AM</option>
                                <option>PM</option>
                            </select>
                        </div>
                    </div>
                </div>
            )
        case 'check':
            useEffect(()=>{
                setInputValue(formKey, id, false);
            },[]);
            return (
                <div className={`form-check ${addClass}`}>
                    <input className="form-check-input" data-parent-id={parentId} name={name} checked={inputValue(formKey, id, false)} value={id} onChange={(e) => setInputValue(formKey, id, e.target.checked)}  hidden type="checkbox" id={id} />
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
        case 'select':
            return (
                <div className={`form-group ${addClass}`}>
                    {label === null ? '' : <label htmlFor={id}>{label}</label>}
                    <select name={name} className="form-control" id={id} value={inputValue(formKey, name, options[0].value)} onChange={(e) => setInputValue(formKey, name, e.target.value)}>
                        {options.map((option, i) => <option key={i} value={option.value}>{option.as}</option>)}
                    </select>
                </div>
            )
        default:
            return (
                <div className={`form-group ${addClass}`}>
                    {label === null ? '' : <label htmlFor={id}>{label}</label>}
                    <input name={name} value={inputValue(formKey, name, '')} onChange={handleOnChange} type={type} min={min} className={active(invMsg.length !== 0, { activeClass: 'is-invalid', defaultClass: 'form-control' })} />
                    {isdefined(icon, { trueReturn: icon })}
                    <div id={`${id}feedback`} className="invalid-feedback">
                        {invalidMsg}
                    </div>
                </div>
            )
    }

}

const mapStateToProps = (state) => ({
    inputValue: (key, name, defaultValue) => {
        // => key : represents form key in global store
        // => name : represents input name
        // => defaultValue : the value returnd if the input isn't registered yet in global state
        // => function return current value of particular input in particular form
        if (key !== undefined && name !== undefined) {
            // => check if the key an name is definded or not
            if (state.form[key] !== undefined) {
                // => check if the key of the form is registered in the form state or not
                // => return the value if it is defined or default value if it's not
                return state.form[key][name] === undefined ? defaultValue : state.form[key][name];
            }
        }
        return defaultValue;
    }
})

export default connect(mapStateToProps, { setInputValue })(Input);