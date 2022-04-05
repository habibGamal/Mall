import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import active from '../../../helpers/active';
import RadioBox from '../../inputs/RadioBox';
import RadioBoxRow from '../../inputs/RadioBoxRow';
import SubCategory from './SubCategory';
// import CheckBox from '../../inputs/CheckBox';

function Category({ id, name, formKey, subCategories, getInputsValue }) {
    const [selected, setSelected] = useState(false);
    const { category: value } = getInputsValue;
    useEffect(() => {
        setSelected(value == id);
    }, [value])
    return (
        <div className="category radio-boxs">
            <RadioBoxRow
                label={name}
                name='category'
                selected={selected}
                id={id}
                addClass=""
                formKey={formKey}
                value={id}
            />
            <SubCategory formKey={formKey} subCategories={subCategories} />
        </div>
    )
}

const mapStateToProps = (state, { formKey }) => ({
    getInputsValue: state.forms?.[formKey]
})
export default connect(mapStateToProps)(Category)