import React, { useEffect, useState } from 'react'
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
import Picture from '../../models/Picture'
import ProductFormRequest from '../../FormRequests/ProductFormRequest'
import Middleware from '../../packeges/middleware'
import withSessionSsr from '../../lib/withSessionSsr'
import branch from '../../api/branch'
export const getServerSideProps = withSessionSsr(
    async ({req}) => {
        const middleware = new Middleware(req.session.auth);
        return middleware.execute(middleware.only('admin'));
    }
)
function CreateProduct({ pictures }: { pictures: Array<Picture> }) {
    const productFormKey = ProductFormRequest.createKey;
    const [errors, setErrors] = useState(null);
    const [branches, setBranches] = useState([] as Array<{id:number,name:string}>);
    useEffect(() => {
        Forms.attachForm(productFormKey);
        return () => {
            Forms.unattachForm(productFormKey);
            Main.emptyPictures();
        };
    }, []);
    
    useEffect(() => {
        const getProducts = async () => {
            const getIds = await branch.getBranchesIds();
            if (getIds.status === 200) {
                setBranches(getIds.data);
            }
        }
        getProducts();
    }, []);
    async function productStore(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const rawForm: FormData = new FormData(e.currentTarget);
        const productFormRequest = new ProductFormRequest();
        const createRequestForm = await productFormRequest.create(rawForm, pictures);
        // => send product to backend
        try {
            const res = await product.store(createRequestForm);
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
                                { value: 0, as: 'قميص رجالي' },
                                { value: 1, as: 'تيشيرت رجالي' },
                            ]}
                            formKey={productFormKey}
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
                            name="branch_id"
                            id="branch_id"
                            addClass=""
                            options={
                                branches.map(branch => ({ value: branch.id, as: branch.name }))
                            }
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