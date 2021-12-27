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
import Picture from '../../../models/Picture'
import { connect } from 'react-redux';
import Product from '../../../models/Product';
import ProductFormRequest from '../../../FormRequests/ProductFormRequest';

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
function EditProduct({ product, pictures, deletedPictures, resizedPictures }) {
    console.log(resizedPictures);
    
    const formRef = useRef(null);
    let productModel: Product;
    const productFormKey = ProductFormRequest.editKey;
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        Forms.attachForm(productFormKey);
        return () => {
            Forms.unattachForm(productFormKey);
            Main.emptyPictures();
        };
    }, []);
    // => initialize the values
    useEffect(() => {
        productModel = Product.editable(product, formRef.current)
        productModel.initValues();
    }, []);
    async function productStore(e) {
        e.preventDefault();
        const rawForm: FormData = new FormData(e.target);
        const productModel = new ProductFormRequest();
        const createRequestForm = await productModel.edit(rawForm, pictures, deletedPictures, resizedPictures);
        // => send product to backend
        try {
            let res = await productApi.edit(product.id, rawForm);
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
                        <h2>Create new product</h2>
                    </div>
                    <form className="prototype">
                        <Select
                            label="Prototype"
                            name="prototype"
                            id="random"
                            addClass=""
                            options={[
                                { value: 0, as: 'Prototype 1' },
                                { value: 1, as: 'Prototype 2' },
                            ]}
                            formKey={productFormKey}
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
                            />
                            {pictures.map((picture) => <Preview picture={picture} to="product" key={picture.id} />)}
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
                                name="has_offer"
                                value="has_offer"
                                label="Has an offer"
                                addClass="col-md-3"
                                id="offer_price_check"
                                formKey={productFormKey}
                            />
                            <Number
                                label="Product price after sale"
                                icon={<i className="fas fa-dollar-sign" />}
                                name="offer_price"
                                id="offer_price"
                                invalidMsg={invalid('offer_price', errors)}
                                formKey={productFormKey}
                            />
                        </div>
                        <div className="categories">
                            <label>Categories</label>
                            <SelectCategories
                                formKey={productFormKey}
                                invalidMsg={invalid('category', errors)}
                            />
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
                            id="branch"
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
                                id="colors_option"
                                formKey={productFormKey}
                            />
                            <Chips
                                label="Available Sizes"
                                icon={<i className="fas fa-box" />}
                                name="sizes_option"
                                id="sizes_option"
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
                            addClass=""
                            icon={<i className="fas fa-box" />}
                            name="brand"
                            id="brand"
                            invalidMsg={invalid('brand', errors)}
                            formKey={productFormKey}
                        />
                        <div className="form-row align-items-end">
                            <Text
                                label="Warranty"
                                icon={<i className="fas fa-box" />}
                                name="warranty_time"
                                id="warranty_time"
                                invalidMsg={invalid('warranty_time', errors)}
                                formKey={productFormKey}
                            />
                            <Select
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
                        <button className="btn btn-success mx-3">Push Product</button>
                        <button className="btn btn-warning mx-3">Draft Product</button>
                        <button className="btn btn-primary mx-3">Save as Prototype</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
const mapStateToProps = state => {
    return {
        formInputsNames: state.forms,
        pictures: state.main.pictures,
        deletedPictures: state.main.deletedPicturesPaths,
        resizedPictures: state.main.resizedOldPictures,
    }
}
export default connect(mapStateToProps)(EditProduct);