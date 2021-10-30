import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import category from '../../../../../api/category';
import invalid from '../../../../../helpers/invalid';
import isThat from '../../../../../helpers/isThat';
import Category from './Category'
import Popup from '../../../../popup/Popup'
import EditCategory from '../../../../popup/EditCategory'
import listCategories from '../../../../../helpers/listCategories';
import { ApiData, Forms, Messages } from '../../../../../redux/dispatcher';
import { $Async } from '../../../../../redux/asyncActions';
import Text from '../../../../inputs/Text';
import Select from '../../../../inputs/Select';

function Categories({ categories }) {
    const formKey = 'add_cat';
    const [errors, setErrors] = useState(null);
    const [buttonsT, setButtonsT] = useState('');
    useEffect(() => {
        $Async.GetCategories();
        Forms.attachForm(formKey);
        return () => {
            Forms.unattachForm(formKey);
            ApiData.clearCategories();
        }
    }, []);
    useEffect(() => {
        // => this is in small media(576px) this is escape effect for actions in the table
        const escape = e => {
            if (buttonsT !== '') {
                let clicked = e.target;
                // => if the clicked element is not div.expand-btns and i.fa-ellipsis-v
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
    function addCategory(e) {
        e.preventDefault();
        let form = new FormData(e.target);
        // => send category to backend
        category.store(form)
            // => debug successful states
            .then(res => {
                if (res.status === 200) {
                    // => get the new categories from backend
                    $Async.GetCategories();
                    // => success message
                    Messages.set('success', <>Category <strong>{form.get('name')}</strong> has been added successfully</>);
                    // => clean Inputs
                    Forms.emptyForm(formKey);
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
                    <Text
                        label="Category Name"
                        addClass=""
                        name="name"
                        id="category_name"
                        invalidMsg={invalid('name', errors)}
                        formKey={formKey}
                    />
                    <Select
                        label="Parent Category"
                        addClass=""
                        options={[{ value: 0, as: 'No parent' }, ...listCategories(categories)]}
                        name="parent_id"
                        id="category_parent"
                        formKey={formKey}
                    />
                    <button className="btn btn-primary my-2">Add Category</button>
                </form>
            </div>
            <Popup keyPopup="edit-category">
                <EditCategory keyPopup="edit-category" />
            </Popup>
            <div className="categories-list">
                {listCategories(categories, true).map(c => {
                    return (
                        <Category
                            name={c.as}
                            id={c.value}
                            key={c.value}
                            level={c.level}
                            buttonsT={buttonsT}
                            setButtonsT={setButtonsT}
                            subCategories={c.children}
                        />
                    )
                })}
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    categories: state.apiData.categories,
})
export default connect(mapStateToProps)(Categories);