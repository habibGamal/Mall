import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import active from '../../../helpers/active';
import RadioBox from '../../inputs/RadioBox';
import SubCategory from './SubCategory';
// import CheckBox from '../../inputs/CheckBox';

function Category({ id, name, formKey, subCategories, getInputValue }) {
    const [selected, setSelected] = useState(false);
    const value = getInputValue(formKey, 'category');
    useEffect(() => {
        setSelected(value == id);
    }, [value])
    return (
        <div className="category">
            <div className={active(selected,{defaultClass:'category-row'})}>
                <span>{name}</span>
                <RadioBox
                    label={null}
                    name='category'
                    id={id}
                    addClass=""
                    formKey={formKey}
                    value={id}
                />
            </div>
            <SubCategory formKey={formKey} subCategories={subCategories} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    getInputValue: (key, name, defaultValue = false) => {
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
export default connect(mapStateToProps)(Category)