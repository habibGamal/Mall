import React from 'react'
import Input from '../components/inputs/Input'

export default function CreateStore() {
    let week = [
        'Friday',
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
    ]
    let holidays = week.map((day, i) => <Input key={i} id={i} label={day} type="check" />)
    return (
        <section className="single-page-form dark">
            <div className="container">
                <div className="title">
                    <h2>Create your store now</h2>
                </div>
                <form className="form">
                    <div className="groups">
                        <h3>Requirements</h3>
                        <div className="form-row">
                            <Input
                                label="Shop owner name"
                                type="text"
                                icon={<i className="fas fa-store" />}
                            />
                            <Input
                                label="Email"
                                type="email"
                                icon={<i className="fas fa-user" />}
                            />
                        </div>
                        <div className="form-row">
                            <Input
                                label="Password"
                                type="password"
                                icon={<i className="fas fa-key" />}
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                icon={<i className="fas fa-key" />}
                            />
                        </div>
                        <div className="form-row">
                            <Input
                                label="Governorate"
                                type="text"
                                icon={<i className="fas fa-map-marker-alt" />}
                            />
                            <Input
                                label="Phone Number"
                                type="number"
                                icon={<i className="fas fa-phone-alt" />}
                            />
                        </div>
                        <div className="form-row">
                            <Input
                                label="Id Card"
                                type="number"
                                icon={<i className="fas fa-id-card" />}
                            />
                            <Input
                                label="Can returned"
                                type="select"
                                options={[
                                    'The product can be returned',
                                    'The product can NOT be returned'
                                ]}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="productName">Holidays</label>
                                <div className="form-row">
                                    {holidays}
                                </div>
                            </div>
                            <Input
                                label="Work hours"
                                type="period"
                            />
                        </div>
                        <div className="form-row">
                            <Input
                                label="Business Type"
                                type="text"
                                icon={<i className="fas fa-shopping-bag" />}
                            />
                            <Input
                                label="Work From"
                                type="select"
                                options={[
                                    'Shop',
                                    'Home'
                                ]}
                            />
                        </div>
                    </div>
                    <div className="groups">
                        <h3>Shop Details</h3>
                        <div className="form-row align-items-end">
                            <Input
                                label="Branches"
                                type="select"
                                options={[
                                    'Just one branch',
                                    'Multiple branches'
                                ]}
                            />
                            <Input
                                label=""
                                type="select"
                                options={[
                                    'All branches have the same name',
                                    'Branches have different names'
                                ]}
                            />
                        </div>
                        <Input
                            label="Number of branches"
                            type="number"
                            addClass=""
                            icon={<i className="fas fa-shopping-bag" />}
                        />
                    </div>
                    <div className="groups branch">
                        <div className="form-row">
                            <Input
                                label="Shop Name"
                                type="text"
                                icon={<i className="fas fa-shopping-bag" />}
                            />
                            <Input
                                label="Address"
                                type="text"
                                icon={<i className="fas fa-shopping-bag" />}
                            />
                        </div>
                        <div className="form-row">
                            <Input
                                label="Shop Logo"
                                type="file"
                            />
                            <div className="form-group col-md-6">
                                <label htmlFor="productName">Gps Location</label>
                                <input type="button" className="form-control btn btn-primary" defaultValue="Locate" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>

    )
}
