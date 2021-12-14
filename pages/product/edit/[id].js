import React, { useEffect, useRef, useState } from 'react'
import Text from '../../../components/inputs/Text'
import Preview from '../../../components/inputs/Preview'
import invalid from '../../../helpers/invalid'
import productApi from '../../../api/product';
import SelectCategories from '../../../components/general/selectCategories/SelectCategories'
import Chips from '../../../components/inputs/Chips'
import { Forms, Main } from '../../../redux/dispatcher'
import Number from '../../../components/inputs/Number'
import CheckBox from '../../../components/inputs/CheckBox'
import Select from '../../../components/inputs/Select'
import File from '../../../components/inputs/File'
import { compressPictures } from '../../../helpers/compressPictures'
import Form from '../../../packeges/Form'
import Picture from '../../../models/Picture'
import { connect } from 'react-redux';
import { api } from '../../../api/instance';
import Product from '../../../models/Product';

export const getServerSideProps = async (ctx) => {
    try {
        const res = await productApi.show(ctx.params.id);
        return {
            props: {
                product: res.data
            }
        }
    } catch (err) {
        const status = err?.response?.status;
        if (status === 404) {
            return {
                notFound: true,
            }
        }
        return {
            notFound: true,
        }
    }
}
function EditProduct({ product, pictures }) {
    const formRef = useRef(null);
    const productModel = new Product(product,formRef);
    const productFormKey = productModel.editKey;
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        Forms.attachForm(productFormKey);
        return () => {
            Forms.unattachForm(productFormKey);
            Main.emptyPictures();
        };
    }, []);
    // => initialize the values
    useEffect(async () => {
        await productModel.initValues();
    }, []);
    async function productStore(e) {
        e.preventDefault();
        let formInstanse = new Form(e.target);
        let { form } = formInstanse;
        let structure = await Product.createProductStructure(pictures);
        let structureMap = new Map(structure);
        formInstanse.structure(structureMap);
        // => delete Picture input
        form.delete('picture');
        // => send product to backend
        try {
            let res = await product.store(form);
        } catch (err) {
            if (err.response) {
                let { data, status } = err.response;
                if (status == 422) {
                    setErrors(data.errors);
                }
            }
        }
    }
    return (
        <section className="single-page-form dark">
            <div className="container">
                <div className="head">
                    <div className="title">
                        <h2>Edit the product</h2>
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
                <form ref={formRef} id={productFormKey} onSubmit={productStore} className="form" encType="multipart/form-data">
                    <div className="groups">
                        <h3>Required</h3>
                        <div className="row align-items-center mx-1">
                            <File
                                label="Product Picture"
                                addClass=""
                                onChange={Picture.init}
                                name="picture"
                                multiple={true}
                                id="picture"
                                invalidMsg={invalid('pictures', errors)}
                                formKey={productFormKey}
                            />
                            {pictures.map(picture => <Preview picture={picture} to="product" key={picture.id} />)}
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
                            name="branch"
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
const mapStateToProps = state => {
    return {
        formInputsNames: state.forms,
        pictures: state.main.pictures
    }
}
export default connect(mapStateToProps)(EditProduct);