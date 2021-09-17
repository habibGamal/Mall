import React, { useMemo, useState } from 'react'
import Input from '../components/inputs/Input'
import Preview from '../components/inputs/Preview'
import showFiles from '../helpers/showFiles'
import active from '../helpers/active'
export default function CreateProduct() {
    const [previews,setPreviews] = useState([]);
    const [previewT,setPreviewT] = useState(false);
    function pictureInit(e) {
        let files = e.target.files;
        if (files.length !== 0) {
            console.log(files);
            for (let i = 0; i < files.length; i++) {
                showFiles(files[i]).then(e => {
                    setPreviews(old =>[...old,e.target.result])
                });
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
                <form className="form">
                    <h3>Required</h3>
                    <div className="groups">
                        <div className="row align-items-center">
                            <div onClick={()=>setPreviewT(false)} className={active(previewT,{ defaultClass: 'escape-effect' })}></div>
                            <Input
                                label="Product Picture"
                                type="file"
                                addClass=""
                                onChange={pictureInit}
                            />
                            {previews.map((imgSrc,i)=><Preview imgSrc={imgSrc} key={i} previewT={previewT} setPreviewT={setPreviewT}/>)}
                        </div>
                        <Input
                            label="Product Name"
                            type="text"
                            addClass=""
                            icon={<i className="fas fa-box" />}
                        />
                        <Input
                            label="Product Price"
                            type="number"
                            addClass=""
                            icon={<i className="fas fa-dollar-sign" />}
                        />
                        <div className="form-row align-items-center">
                            <Input
                                label="Has an offer"
                                type="check"
                                addClass="col-md-3"
                            />
                            <Input
                                label="Product price after sale"
                                type="text"
                                icon={<i className="fas fa-dollar-sign" />}
                            />
                        </div>
                        <div className="categories">
                            <label>Categories</label>
                            <div className="show-categories">
                                <div className="category">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" hidden type="checkbox" id={1} defaultValue="option1" />
                                        <label className="form-check-label" htmlFor={1}>
                                            <span className="box">
                                                <i className="fas fa-check" />
                                            </span>
                                            <span>
                                                Men
                                            </span>
                                        </label>
                                    </div>
                                    <div className="sub-category">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" hidden type="checkbox" id={2} defaultValue="option1" />
                                            <label className="form-check-label" htmlFor={2}>
                                                <span className="box">
                                                    <i className="fas fa-check" />
                                                </span>
                                                <span>
                                                    T-shirts
                                                </span>
                                            </label>
                                        </div>
                                        <div className="sub-category">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" hidden type="checkbox" id={3} defaultValue="option1" />
                                                <label className="form-check-label" htmlFor={3}>
                                                    <span className="box">
                                                        <i className="fas fa-check" />
                                                    </span>
                                                    <span>
                                                        Polo
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row align-items-center">
                            <Input
                                label="Stock"
                                type="select"
                                options={[
                                    'In stock',
                                    'Upcoming',
                                    'Out of stock',
                                ]}
                            />
                            <Input
                                label="Can returned"
                                type="select"
                                options={[
                                    'This product can be returned',
                                    'This product can NOT be returned',
                                ]}
                            />
                        </div>
                        <Input
                            label="Branch"
                            type="select"
                            addClass=""
                            options={[
                                'all branches',
                                'in branch 1',
                                'in branch 2',
                                'in branch 3',
                            ]}
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
                            <textarea className="form-control" rows={3} defaultValue={""} />
                        </div>
                        <div className="form-group">
                            <label>Specifications</label>
                            <textarea className="form-control" rows={3} defaultValue={""} />
                        </div>
                        <Input
                            label="Brand"
                            type="text"
                            addClass=""
                            icon={<i className="fas fa-box" />}
                        />
                        <div className="form-row align-items-end">
                            <Input
                                label="Warranty"
                                type="text"
                                icon={<i className="fas fa-box" />}
                            />
                            <Input
                                label=""
                                type="select"
                                options={[
                                    'Year',
                                    'Month',
                                    'Day',
                                ]}
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
