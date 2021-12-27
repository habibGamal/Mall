import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import isdefined from '../../helpers/isdefined';
import { Forms } from '../../redux/dispatcher';
import Chip from '../../types/Chip';

interface ChipsProps {
    addClass?: string,
    id: string,
    label?: string,
    name: string,
    formKey: string,
    icon: JSX.Element,
    inputValue: Function,
    initChips: Function,
}
function Chips({ addClass = 'col-md-6', id, name, label, icon, formKey, inputValue, initChips }: ChipsProps) {
    const [chips, setChips] = useState([] as Array<Chip>);
    const initValue: Array<Chip> = initChips(formKey, name + '_chips');
    useEffect(() => {
        if (initValue) {
            setChips(initValue);
        }
    }, [initValue]);
    function handler(e: React.ChangeEvent<HTMLInputElement>) {
        Forms.setInputValue(formKey, name, e.target.value);
    }
    function removeChip(index: number) {
        setChips(old => old.filter(chip => chip.index !== index));
    }
    function emitter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'Enter' && e.currentTarget.value != '') {
            e.preventDefault();
            setChips(old => {
                return [
                    ...old,
                    {
                        index: old[old.length - 1] ? old[old.length - 1].index + 1 : old.length,
                        name: e.currentTarget.value,
                    } as Chip
                ]
            });
            Forms.setInputValue(formKey, name, '');
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
    },
    initChips: (key: string, name: string): Array<Chip> => state.forms[key]?.[name],
})

export default connect(mapStateToProps)(Chips);
