import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import category from '../../../../../api/category';
import invalid from '../../../../../helpers/invalid';
import isThat from '../../../../../helpers/isThat';
import { attachForm, unAttachForm, emptyForm } from '../../../../../redux/actions/form';
import { SetMessage } from '../../../../../redux/dispatchDirect';
import Input from '../../../../inputs/Input'
import Category from './Category'

function Categories({ attachForm, unAttachForm , emptyForm}) {
    const formKey = 'add_cat';
    const [errors, setErrors] = useState(null);
    const [categories, setCategories] = useState([]);
    const [buttonsT, setButtonsT] = useState('');
    const refreshCategories = () => category.index().then(res => setCategories(res.data));
    useEffect(() => {
        refreshCategories();
        attachForm(formKey);
        return () => {
            unAttachForm(formKey);
        }
    }, []);
    useEffect(() => {
        // => this is in small media(576px) this is escape effect for actions in the table
        const escape = e => {
            if (buttonsT !== '') {
                let clicked = e.target;
                // => if the clicked element is not div.expand and i.fa-ellipsis-v
                if (!isThat(clicked, 'DIV', { className: 'expand' }) && !isThat(clicked, 'I', { className: 'fa-ellipsis-v' })) {
                    // => clear the buttons toggle
                    setButtonsT('');
                }
            }
        }
        // => set the event
        document.addEventListener('click', escape);
        return () => {
            // => clean up the event in unmount
            document.removeEventListener('click', escape);
        }
    }, [buttonsT]);
    function catLevel(level) {
        let buffer = '';
        for (let i = 0; i < level; i++) {
            buffer += '→';
        }
        return buffer;
    }
    function mappingCategory(c) {
        let buffer = [];
        buffer.push({ value: c.id, as: catLevel(c.level) + c.name });
        if (c.sub_categories.length !== 0) {
            c.sub_categories.forEach(cc => buffer.push(...mappingCategory(cc)));
        }
        return buffer;
    }
    function listCategories(categories) {
        if (categories !== null) {
            let buffer = [];
            categories.forEach(c => {
                buffer.push(...mappingCategory(c));
            });
            return buffer;
        }
        return [{}];
    }
    function addCategory(e) {
        e.preventDefault();
        let form = new FormData(e.target);
        // => send category to backend
        category.store(form)
        // => debug successful states
        .then(res => {
            if(res.status === 200){
                // => get the new categories from backend
                refreshCategories();
                // => success message
                SetMessage('success',<>Category <strong>{form.get('name')}</strong> has been added successfully</>);
                // => clean Inputs
                emptyForm(formKey);
                // => clean errors if exists
                setErrors(null);
            }
            })
            // => debug errors
            .catch(err => {
                // => get error data,status code 
                const { data, status } = err.response;
                // => code 422 (invalid data)
                if (status === 422) {
                    setErrors(data.errors);
                }
            });
    }
    return (
        <div className="categories">
            <div className="add-category">
                <h4>Add New Category</h4>
                <form onSubmit={addCategory}>
                    <Input
                        label="Category Name"
                        type="text"
                        addClass=""
                        name="name"
                        id="category_name"
                        invalidMsg={invalid('name', errors)}
                        formKey={formKey}
                    />
                    <Input
                        label="Parent Category"
                        type="select"
                        addClass=""
                        options={[{ value: 0, as: 'No parent' }, ...listCategories(categories)]}
                        name="parent_id"
                        id="category_parent"
                        formKey={formKey}
                    />
                    <button className="btn btn-primary my-2">Add Category</button>
                </form>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Count</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listCategories(categories).map(c => (
                        <Category
                            name={c.as}
                            count={25}
                            id={c.value}
                            key={c.value}
                            buttonsT={buttonsT}
                            setButtonsT={setButtonsT}
                        />
                    ))}

                    {/* <Category
                        name="&#x2015;&#x2015;Lg"
                        count="52"
                    /> */}
                </tbody>
            </table>

        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    attachForm: fromKey => dispatch(attachForm(fromKey)),
    unAttachForm: fromKey => dispatch(unAttachForm(fromKey)),
    emptyForm: fromKey => dispatch(emptyForm(fromKey)),
})
export default connect(null, mapDispatchToProps)(Categories);