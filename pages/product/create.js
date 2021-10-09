import React, { useEffect, useRef, useState } from 'react'
import Input from '../../components/inputs/Input'
import Preview from '../../components/inputs/Preview'
import showFiles from '../../helpers/showFiles'
import active from '../../helpers/active'
import imageCompression from 'browser-image-compression'
import product from '../../api/product'
import { connect } from 'react-redux'
import { setPicture } from '../../redux/actions/main'
import { attachForm, unAttachForm } from '../../redux/actions/form'
import invalid from '../../helpers/invalid'
import SelectCategories from '../../components/general/selectCategories/SelectCategories'
function CreateProduct({ pictures, setPicture,attachForm, unAttachForm  }) {
    const productFormKey = 'product_form';
    const productForm = useRef(null);
    const [previewT, setPreviewT] = useState(false);
    const [errors, setErrors] = useState(null);
    useEffect(()=>{
        attachForm(productFormKey);
        return ()=>unAttachForm(productFormKey);
    },[])
    function pictureInit(e) {
        let files = e.target.files;
        if (files.length !== 0) {
            for (let i = 0; i < files.length; i++) {
                showFiles(files[i]).then(e => {
                    setPicture({ picture: files[i], base: e.target.result });
                });
            }
        }
    }
    function compressPictures(pictures) {
        // => this will return array of promises
        return pictures.map(async p => {
            // => compress the picture and buffer it 
            let buffer = await imageCompression(p.picture, { maxSizeMB: .05 })
            return buffer;
        });
    }
    function splitSpecifications(spec) {
        /**
         * it takes ===>
         * made in:taywan
         * color:black
         * return ===>
         * [
         *  {'made in':'taywan'},
         *  {'color':'black'}
         * ]
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
        let form = new FormData(productForm.current);
        // => handle pictures
        let compressedPictures = await Promise.all(compressPictures(pictures));
        compressedPictures.forEach((p, i) => {
            form.append('pictures[]', p, p.name);
            form.append('pictures_position[]', JSON.stringify(pictures[i].position));
        })
        // => handle specificaitons
        form.set('specifications', JSON.stringify(splitSpecifications(form.get('specifications'))));
        // => handle warranty
        form.set('warranty', form.get('warranty_time') + ' ' + form.get('warranty_date'));
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
                        <Input
                            label="Prototype"
                            type="select"
                            addClass=""
                            options={[
                                'قميص رجالي',
                                'تيشيرت رجالي'
                            ]}
                        />
                    </form>
                </div>
                <form ref={productForm} id={productFormKey} onSubmit={productStore} className="form" encType="multipart/form-data">
                    <h3>Required</h3>
                    <div className="groups">
                        <div className="row align-items-center">
                            <div onClick={() => setPreviewT(false)} className={active(previewT, { defaultClass: 'escape-effect' })}></div>
                            <Input
                                label="Product Picture"
                                type="file"
                                addClass=""
                                onChange={pictureInit}
                                name="picture"
                                id="picture"
                                invalidMsg={invalid('pictures', errors)}
                                formKey={productFormKey}
                            />
                            {pictures.map((picture, i) => <Preview imgSrc={picture.base} index={i} key={i} previewT={previewT} setPreviewT={setPreviewT} />)}
                        </div>
                        <Input
                            label="Product Name"
                            type="text"
                            addClass=""
                            icon={<i className="fas fa-box" />}
                            name="name"
                            id="name"
                            invalidMsg={invalid('name', errors)}
                            formKey={productFormKey}
                        />
                        <Input
                            label="Product Price"
                            type="number"
                            addClass=""
                            icon={<i className="fas fa-dollar-sign" />}
                            name="price"
                            id="price"
                            min={0}
                            invalidMsg={invalid('price', errors)}
                            formKey={productFormKey}
                        />
                        <div className="form-row align-items-center">
                            <Input
                                label="Has an offer"
                                type="check"
                                addClass="col-md-3"
                                id="offer_price_check"
                                formKey={productFormKey}
                            />
                            <Input
                                label="Product price after sale"
                                type="text"
                                icon={<i className="fas fa-dollar-sign" />}
                                name="offer_price"
                                id="offer_price"
                                formKey={productFormKey}
                            />
                        </div>
                        <div className="categories">
                            <label>Categories</label>
                            <div className="show-categories">
                                <SelectCategories formKey={productFormKey}/>
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <Input
                                label="Stock"
                                type="select"
                                options={[
                                    { value: 1, as: 'In stock' },
                                    { value: 2, as: 'Upcoming' },
                                    { value: 0, as: 'Out of stock' }
                                ]}
                                name="stock"
                                id="stock"
                                formKey={productFormKey}
                            />
                            <Input
                                label="Can returned"
                                type="select"
                                options={[
                                    { value: 1, as: 'This product can be returned' },
                                    { value: 0, as: 'This product can NOT be returned' },
                                ]}
                                name="returnable"
                                id="returnable"
                                formKey={productFormKey}
                            />
                        </div>
                        <Input
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
                    <h3>Optional</h3>
                    <div className="groups">
                        <div className="form-row">
                            <Input
                                label="Available Colors"
                                type="text"
                                icon={<i className="fas fa-palette" />}
                            />
                            <Input
                                label="Available Sizes"
                                type="text"
                                icon={<i className="fas fa-box" />}
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
                        <Input
                            label="Brand"
                            type="text"
                            addClass=""
                            icon={<i className="fas fa-box" />}
                            name="brand"
                            id="brand"
                            formKey={productFormKey}
                        />
                        <div className="form-row align-items-end">
                            <Input
                                label="Warranty"
                                type="text"
                                icon={<i className="fas fa-box" />}
                                name="warranty_time"
                                id="warranty_time"
                                formKey={productFormKey}
                            />
                            <Input
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
export default connect(mapPropsFromState, { setPicture,  attachForm, unAttachForm  })(CreateProduct);