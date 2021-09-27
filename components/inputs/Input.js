import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import active from '../../helpers/active';
import isdefined from '../../helpers/isdefined';
import { setInputValue } from '../../redux/actions/form';
import store from '../../redux/store';
function Input({ name, id, label, type, options, min, icon, invalidMsg, formKey, addClass, onChange ,inputValue, setInputValue}) {
    // const [value, setValue] = useState('init');
    if (addClass === undefined) {
        addClass = 'col-md-6';
    }
    if (invalidMsg === undefined) {
        invalidMsg = '';
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
            return (
                <div className={`form-check ${addClass}`}>
                    <input className="form-check-input" name={name} hidden type="checkbox" id={id} defaultValue="option1" />
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
                    <select name={name} className="form-control" id={id} value={inputValue(formKey,name,options[0].value)} onChange={(e) => setInputValue(formKey,name,e.target.value)}>
                        {options.map((option, i) => <option key={i} value={option.value}>{option.as}</option>)}
                    </select>
                </div>
            )
        default:
            return (
                <div className={`form-group ${addClass}`}>
                    {label === null ? '' : <label htmlFor={id}>{label}</label>}
                    <input name={name} value={inputValue(formKey,name,'')} onChange={(e) => setInputValue(formKey,name,e.target.value)} type={type} min={min} className={active(invalidMsg.length !== 0, { activeClass: 'is-invalid', defaultClass: 'form-control' })} />
                    {isdefined(icon, { trueReturn: icon })}
                    <div id={`${id}feedback`} className="invalid-feedback">
                        {invalidMsg}
                    </div>
                </div>
            )
    }

}

const mapStateToProps = (state) => ({
    inputValue: (key,name,defaultValue) => {
        if(key !== undefined && name !== undefined){
            if(state.form[key] !== undefined){
                return state.form[key][name] === undefined ? defaultValue:state.form[key][name];
            }
        }
        return defaultValue;
    },
})
const mapDispatchToProps = (dispatch) => ({
    setInputValue: (key,name,value)=>dispatch(setInputValue(key,name,value))
})
export default connect(mapStateToProps,mapDispatchToProps)(Input);