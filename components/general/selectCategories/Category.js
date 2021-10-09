import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Input from '../../inputs/Input'
import { setInputValue } from '../../../redux/actions/form'
import SubCategory from './SubCategory';

function Category({ id, name, formKey, subCategories, parentId, setInputValue }) {
    useEffect(() => {
        // => get the category that is selected
        const selectedCat = document.getElementById(id);
        selectedCat.addEventListener('change',()=>{
            nestedSelect(selectedCat)
        });
    }, []);
    function nestedSelect(cat) {
        // => get parent Id
        const parentCatId = cat.getAttribute('data-parent-id');
        // => if the parent category id not null
        if (parentCatId) {
            // => change its state
            setInputValue(formKey, parentCatId, cat.checked);
            nestedSelect(document.getElementById(parentCatId))
        }

    }
    return (
        <div className="category">
            <Input
                label={name}
                type="check"
                name='category'
                id={id}
                addClass=""
                formKey={formKey}
                parentId={parentId}
            />
            <SubCategory formKey={formKey} parentId={id} subCategories={subCategories} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    getInputValue: (key, name) => {
        return state.form[key][name];
    }
})
export default connect(mapStateToProps, { setInputValue })(Category)