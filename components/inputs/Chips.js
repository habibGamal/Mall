import React, { useState } from 'react'
import { connect } from 'react-redux';
import isdefined from '../../helpers/isdefined';
import { setInputValue } from '../../redux/actions/form'
function Chips({ addClass, id, name, label, icon, formKey, inputValue, setInputValue, }) {
    const [chips, setChips] = useState([]);
    if (addClass === undefined) {
        addClass = 'col-md-6';
    }
    function handler(e) {
        setInputValue(formKey, name, e.target.value);
    }
    function removeChip(index) {
        setChips(old => old.filter(chip => chip.index !== index));
    }
    function emitter(e) {
        if (e.key == 'Enter') {
            e.preventDefault();
            setChips(old => [
                ...old,
                {
                    index: old[old.length] ? old[old.length].index++ : old.length,
                    name: e.target.value,
                }
            ]);
            setInputValue(formKey, name, '');
        }
    }
    return (
        <div className={`chips ${addClass}`}>
            <div className="form-group">
                {label ? <label htmlFor={id}>{label}</label> : ''}
                <input name={name} value={inputValue(formKey, name, '')} onKeyDown={emitter} onChange={handler} type="text" className="form-control" />
                {isdefined(icon, { trueReturn: icon })}
            </div>
            {chips.map(chip =>
                <span className="chip" data-name={name} data-value={chip.name} key={chip.index}>
                    {chip.name}
                    <span onClick={() => removeChip(chip.index)} className="close">&times;</span>
                </span>
            )}
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
            if (state.form[key] !== undefined) {
                // => check if the key of the form is registered in the form state or not
                // => return the value if it is defined or default value if it's not
                return state.form[key][name] === undefined ? defaultValue : state.form[key][name];
            }
        }
        return defaultValue;
    },
})

export default connect(mapStateToProps, { setInputValue })(Chips);
