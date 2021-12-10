import React, { useEffect, useRef, useState } from 'react'
import Text from '../../components/inputs/Text'
import Preview from '../../components/inputs/Preview'
import product from '../../api/product'
import { connect } from 'react-redux'
import invalid from '../../helpers/invalid'
import SelectCategories from '../../components/general/selectCategories/SelectCategories'
import Chips from '../../components/inputs/Chips'
import { Forms, Main } from '../../redux/dispatcher'
import Number from '../../components/inputs/Number'
import CheckBox from '../../components/inputs/CheckBox'
import Select from '../../components/inputs/Select'
import File from '../../components/inputs/File'
import pictureInit from '../../helpers/pictureInit'
import { compressPictures } from '../../helpers/compressPictures'
import Form from '../../packeges/Form'
function CreateProduct({ pictures }) {
    const productFormKey = 'product_form';
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        Forms.attachForm(productFormKey);
        return () => {
            Forms.unattachForm(productFormKey);
            Main.emptyPictures();
        };
    }, []);
    function splitSpecifications(spec) {
        /*
         it takes ===>
            made in:taywan
            color:black
         return ===>
            [
                {'made in':'taywan'},
                {'color':'black'}
            ]
         */
        // => replace any \n \r (brack line) from the text
        return spec.replace(/(\r\n|\n|\r)/gm, "")
            // => split the string by (,)
            .split(',')
            // => map over each specification and split it by (:) to get property name and property value
            .map(s => s.split(':'))
            // => set them in the structure
            .map(a => ({ [a[0]]: a[1] }))
    }
    async function productStore(e) {
        e.preventDefault();
        let formInstanse = new Form(e.target);
        let { form } = formInstanse;
        let compressedPictures = await Promise.all(compressPictures(pictures));
        let structure = [
            ['colors_option', { from: 'colors_option', type: 'chips' }],
            ['sizes_option', { from: 'sizes_option', type: 'chips' }],
            ['specifications', { from: splitSpecifications(form.get('specifications')), type: 'free-json' }],
            ['warranty_time', { from: 'warranty_time[+]warranty_date', type: 'collect', options: { separator: ' ' } }],
            ['pictures[]', { from: compressedPictures, type: 'free-array', options: { filename: true } }],
            ['pictures_position[]', { from: pictures.map(p => JSON.stringify(p.position)), type: 'free-array' }]
        ]
        let str = new Map(structure);
        formInstanse.structure(str);
        // => delete Picture input
        form.delete('picture');
        // => send product to backend
        product.store(form)
            // => debug successful states
            .then(res => console.log(res))
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
        <section className="single-page-form dark">
            <div className="container">
                <div className="head">
                    <div className="title">
                        <h2>Create new product</h2>
                    </div>
                    <form className="prototype">
                        <Select
                            label="Prototype"
                            type="select"
                            addClass=""
                            options={[
                                { value: 0, as: 'قميص رجالي' },
                                { value: 1, as: 'تيشيرت رجالي' },
                            ]}
                        />
                    </form>
                </div>
                <form id={productFormKey} onSubmit={productStore} className="form" encType="multipart/form-data">
                    <div className="groups">
                        <h3>Required</h3>
                        <div className="row align-items-center mx-1">
                            <File
                                label="Product Picture"
                                addClass=""
                                onChange={pictureInit}
                                name="picture"
                                multiple={true}
                                id="picture"
                                invalidMsg={invalid('pictures', errors)}
                                formKey={productFormKey}
                            />
                            {pictures.map((picture, i) => <Preview imgSrc={picture.base} index={i} to="product" key={i} />)}
                        </div>
                        <Text
                            label="Product Name"
                            addClass=""
                            icon={<i className="fas fa-box" />}
                            name="name"
                            id="name"
                            invalidMsg={invalid('name', errors)}
                            formKey={productFormKey}
                        />
                        <Number
                            label="Product Price"
                            addClass=""
                            icon={<i className="fas fa-dollar-sign" />}
                            name="price"
                            id="price"
                            min={0}
                            invalidMsg={invalid('price', errors)}
                            formKey={productFormKey}
                        />
                        <div className="form-row align-items-center">
                            <CheckBox
                                label="Has an offer"
                                type="check"
                                addClass="col-md-3"
                                id="offer_price_check"
                                formKey={productFormKey}
                            />
                            <Text
                                label="Product price after sale"
                                icon={<i className="fas fa-dollar-sign" />}
                                name="offer_price"
                                id="offer_price"
                                formKey={productFormKey}
                            />
                        </div>
                        <div className="categories">
                            <label>Categories</label>
                            <div className="show-categories">
                                <SelectCategories formKey={productFormKey} />
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <Select
                                label="Stock"
                                options={[
                                    { value: 1, as: 'In stock' },
                                    { value: 2, as: 'Upcoming' },
                                    { value: 0, as: 'Out of stock' }
                                ]}
                                name="stock"
                                id="stock"
                                formKey={productFormKey}
                            />
                            <Select
                                label="Can returned"
                                options={[
                                    { value: 1, as: 'This product can be returned' },
                                    { value: 0, as: 'This product can NOT be returned' },
                                ]}
                                name="returnable"
                                id="returnable"
                                formKey={productFormKey}
                            />
                        </div>
                        <Select
                            label="Branch"
                            type="select"
                            addClass=""
                            options={[
                                { value: 0, as: 'all branches' },
                                { value: 1, as: 'in branch 1' },
                                { value: 2, as: 'in branch 2' },
                                { value: 3, as: 'in branch 3' },
                            ]}
                            formKey={productFormKey}
                        />
                    </div>
                    <div className="groups">
                        <h3>Optional</h3>
                        <div className="form-row">
                            <Chips
                                label="Available Colors"
                                icon={<i className="fas fa-palette" />}
                                name="colors_option"
                                formKey={productFormKey}
                            />
                            <Chips
                                label="Available Sizes"
                                icon={<i className="fas fa-box" />}
                                name="sizes_option"
                                formKey={productFormKey}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" name="description" rows={3} defaultValue={""} />
                        </div>
                        <div className="form-group">
                            <label>Specifications</label>
                            <textarea className="form-control" name="specifications" rows={3} defaultValue={""} />
                        </div>
                        <Text
                            label="Brand"
                            type="text"
                            addClass=""
                            icon={<i className="fas fa-box" />}
                            name="brand"
                            id="brand"
                            formKey={productFormKey}
                        />
                        <div className="form-row align-items-end">
                            <Text
                                label="Warranty"
                                type="text"
                                icon={<i className="fas fa-box" />}
                                name="warranty_time"
                                id="warranty_time"
                                formKey={productFormKey}
                            />
                            <Select
                                label=""
                                type="select"
                                options={[
                                    { value: 'Year', as: 'Year' },
                                    { value: 'Month', as: 'Month' },
                                    { value: 'Day', as: 'Day' }
                                ]}
                                name="warranty_date"
                                id="warranty_date"
                                formKey={productFormKey}
                            />
                        </div>
                    </div>
                    <div className="btns">
                        <button className="btn btn-success">Push Product</button>
                        <button className="btn btn-warning">Draft Product</button>
                        <button className="btn btn-primary">Save as Prototype</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
const mapPropsFromState = state => ({
    pictures: state.main.pictures,
    picturesPosition: state.main.picturesPosition,
})
export default connect(mapPropsFromState)(CreateProduct);