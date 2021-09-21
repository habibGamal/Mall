import React from 'react'
import isdefined from '../../helpers/isdefined';

export default function Input({ id, label, type, options, icon, addClass, onChange }) {
    if (addClass === undefined) {
        addClass = 'col-md-6';
    }
    switch (type) {
        case 'file':
            return (
                <div className={`form-group ${addClass}`}>
                    <label htmlFor="productPicture">{label}
                        <div className="plus">
                            <i className="fas fa-upload" />
                        </div>
                    </label>
                    <input onChange={onChange} type="file" multiple hidden className="form-control-file" id="productPicture" />
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
                    <input className="form-check-input" hidden type="checkbox" id={id} defaultValue="option1" />
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
                    {label === null ? '' : <label htmlFor="o">{label}</label>}
                    <select className="form-control" id="o">
                        {options.map((option, i) => <option key={i}>{option}</option>)}
                    </select>
                </div>
            )
        default:
            return (
                <div className={`form-group ${addClass}`}>
                    {label === null ? '' : <label htmlFor="o">{label}</label>}
                    <input type={type} className="form-control" />
                    {isdefined(icon, icon)}
                </div>
            )
    }

}
