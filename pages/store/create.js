import React, { useEffect, useRef, useState } from 'react'
import CheckBox from '../../components/inputs/CheckBox';
import Email from '../../components/inputs/Email';
import Number from '../../components/inputs/Number';
import Password from '../../components/inputs/Password';
import Select from '../../components/inputs/Select';
import Text from '../../components/inputs/Text'
import invalid from '../../helpers/invalid'
import { Forms } from '../../redux/dispatcher'
import store from '../../api/store'
import Period from '../../components/inputs/Period';
import { connect } from 'react-redux';
import File from '../../components/inputs/File';
import BranchForm from '../../components/general/BranchForm';
import loader from '../../gps/loader';
function Create({ getInputValue }) {
    const formKey = 'store_form';
    const map = useRef(null);
    const [errors, setErrors] = useState(null);
    const [branches, setBranches] = useState([]);
    const [inputDep, setInputDep] = useState({
        store_info: true,
        same_branches: false,
        branches_number: false,
        store_name: false,
        logo: false
    });
    const week = [
        'Friday',
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
    ]
    useEffect(() => {
        Forms.attachForm(formKey);
        return () => Forms.unattachForm(formKey);
    }, [])
    async function storeCreate(e) {
        e.preventDefault();
        let form = new FormData(e.target);
        // => handle holidays
        form.getAll('holidays').forEach(day => form.append('holidays[]', day));
        // => work hours structure
        form.append('work_hours[from]', form.getAll('work_hours')[0]);
        form.append('work_hours[p1]', form.getAll('work_hours')[1]);
        form.append('work_hours[to]', form.getAll('work_hours')[2]);
        form.append('work_hours[p2]', form.getAll('work_hours')[3]);
        // gps will be implemented !!!
        form.append('gps','gps location');
        let res = await store.store(form);
    }
    useEffect(() => {
        // => one branch(0) or mulitble(1)
        const bool = parseInt(getInputValue('branches')); // return 0 or 1
        // => toggle [same_branches ,branches_number ,store_name ,logo] inputs
        // => toggle store_info section with inverse of bool
        setInputDep((old) => ({
            ...old,
            same_branches: bool,
            branches_number: bool,
            store_name: bool,
            logo: bool,
            store_info: !bool
        }));
        if (!bool) {
            // => if one branch empty branches
            setBranches([]);
        }
    }, [getInputValue('branches')]);

    useEffect(() => {
        // => branches have same name(1) or not (0)
        const bool = parseInt(getInputValue('same_branches')); // return 0 or 1
        // => toggle [store_name,logo] inputs
        setInputDep((old) => ({ ...old, store_name: bool, logo: bool }))
    }, [getInputValue('same_branches')]);

    useEffect(() => {
        if (parseInt(getInputValue('branches'))) {
            if (getInputValue('branches_number') !== null) {
                if (getInputValue('branches_number') > 5) {
                    Forms.setInputValue(formKey, 'branches_number', 5)
                }
                if (getInputValue('branches_number') < 2) {
                    Forms.setInputValue(formKey, 'branches_number', 2)
                }
                let buffer = [];
                for (let i = 1; i <= getInputValue('branches_number'); i++) {
                    buffer.push(
                        <BranchForm
                            key={i - 1}
                            index={i}
                            full={!parseInt(getInputValue('same_branches'))}
                            formKey={formKey}
                            errors={errors}
                        />
                    )
                }
                setBranches(buffer);
            }
        }
    }, [getInputValue('branches_number'), getInputValue('same_branches'), getInputValue('branches')]);

    useEffect(() => {
        loader.load().then(() => {
            let googleMap = new google.maps.Map(map.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
            new google.maps.Marker({
                position: { lat: -34.397, lng: 150.644 },
                map: googleMap,
            })
        });
    });
    return (
        <section className="single-page-form">
            <div className="container">
                <div className="head">
                    <div className="title">
                        <h2>Create your store</h2>
                    </div>
                </div>
                <div
                    ref={map}
                    id="map"
                    style={{
                        height: '500px',
                    }}
                ></div>
                <form onSubmit={storeCreate} className="form">
                    <div className="groups">
                        <h3>Personal Info</h3>
                        <div className="form-row">
                            <Text
                                label="Shop owner name"
                                icon={<i className="fas fa-store" />}
                                name="name"
                                id="name"
                                invalidMsg={invalid('name', errors)}
                                formKey={formKey}
                            />
                            <Text
                                label="Phone Number"
                                id="phone_number"
                                name="phone_number"
                                icon={<i className="fas fa-phone-alt"></i>}
                                formKey={formKey}
                                invalidMsg={invalid('phone_number', errors)}
                            />
                        </div>
                        <div className="form-row">
                            <Email
                                label="Email address"
                                id="email"
                                name="email"
                                icon={<i className="fas fa-user"></i>}
                                formKey={formKey}
                                invalidMsg={invalid('email', errors)}
                            />
                            <Password
                                label="Password"
                                id="password"
                                name="password"
                                icon={<i className="fas fa-key" />}
                                formKey={formKey}
                                invalidMsg={invalid('password', errors)}
                            />
                        </div>
                        <div className="form-row">
                            <Password
                                label="Confirm Password"
                                id="password_confirmation"
                                name="password_confirmation"
                                icon={<i className="fas fa-key" />}
                                formKey={formKey}
                                invalidMsg={invalid('password_confirmation', errors)}
                            />
                            <Text
                                label="Id Card"
                                id="card_id"
                                name="card_id"
                                icon={<i className="fas fa-id-card"></i>}
                                formKey={formKey}
                                invalidMsg={invalid('card_id', errors)}
                            />
                        </div>
                    </div>
                    <div className="groups">
                        <h3>Requirements</h3>
                        <div className="form-row">
                            <Select
                                label="Governorate"
                                name="governorate"
                                id="governorate"
                                invalidMsg={invalid('governorate', errors)}
                                formKey={formKey}
                                options={[
                                    { value: 'assiut', as: 'Assiut' },
                                    { value: 'cairo', as: 'Cairo' },
                                ]}
                            />
                            <Select
                                label="Can returned"
                                name="can_return"
                                id="can_return"
                                invalidMsg={invalid('can_return', errors)}
                                formKey={formKey}
                                options={[
                                    { value: 1, as: 'This product can be returned' },
                                    { value: 0, as: 'This product can NOT be returned' },
                                ]}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="productName">Holidays</label>
                                <div className="form-row">
                                    {
                                        week.map((day, i) => (
                                            <CheckBox
                                                key={i}
                                                label={day}
                                                type="check"
                                                addClass=""
                                                id={day}
                                                name="holidays"
                                                value={day}
                                                formKey={formKey}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                            <Period
                                label="Work hours"
                                name="work_hours"
                                invalidMsg={invalid('work_hours', errors)}
                            />
                        </div>
                        <div className="form-row">
                            <Text
                                label="Business Type"
                                icon={<i className="fas fa-shopping-bag" />}
                                name="business_type"
                                id="business_type"
                                invalidMsg={invalid('business_type', errors)}
                                formKey={formKey}
                            />
                            <Select
                                label="Work From"
                                name="work_from"
                                id="work_from"
                                invalidMsg={invalid('work_from', errors)}
                                formKey={formKey}
                                options={[
                                    { value: 1, as: 'Shop' },
                                    { value: 0, as: 'Home' },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="groups">
                        <h3>Shop Details</h3>
                        <Select
                            label="Branches"
                            name="branches"
                            id="branches"
                            addClass=""
                            invalidMsg={invalid('branches', errors)}
                            formKey={formKey}
                            options={[
                                { value: 0, as: 'Just one branch' },
                                { value: 1, as: 'Multiple branches' },
                            ]}
                        />
                        <div className="form-row align-items-end">
                            {
                                inputDep['branches_number']
                                    ? <Number
                                        label="Number of branches"
                                        name="branches_number"
                                        id="branches_number"
                                        invalidMsg={invalid('branches_number', errors)}
                                        min={2}
                                        step={1}
                                        max={5}
                                        defaultValue={2}
                                        formKey={formKey}
                                    />
                                    : ''
                            }
                            {
                                inputDep['same_branches']
                                    ?
                                    <Select
                                        label=""
                                        name="same_branches"
                                        id="same_branches"
                                        invalidMsg={invalid('same_branches', errors)}
                                        formKey={formKey}
                                        options={[
                                            { value: 1, as: 'All branches have the same name' },
                                            { value: 0, as: 'Branches have different names' },
                                        ]}
                                    />
                                    : ''
                            }
                        </div>
                    </div>
                    {
                        inputDep['store_name'] && inputDep['logo']
                            ? <div className="groups same-name">
                                <Text
                                    label="Store Name"
                                    name="store_name"
                                    id="store_name"
                                    addClass=""
                                    icon={<i className="fas fa-store"></i>}
                                    invalidMsg={invalid('store_name', errors)}
                                    formKey={formKey}
                                />
                                <File
                                    label="Store Logo"
                                    onChange={() => { }}
                                    name="logo"
                                    id="logo"
                                    addClass=""
                                    invalidMsg={invalid('logo', errors)}
                                    formKey={formKey}
                                />
                            </div>
                            : ''
                    }
                    {branches}
                    {
                        inputDep['store_info']
                            ? <div className="groups branch">
                                <h3>Store info</h3>
                                <div className="form-row">
                                    <Text
                                        label="Shop Name"
                                        name="branch_name"
                                        id="branch_name"
                                        icon={<i className="fas fa-store"></i>}
                                        invalidMsg={invalid('branch_name', errors)}
                                        formKey={formKey}
                                    />
                                    <Text
                                        label="Address"
                                        name="address"
                                        id="address"
                                        icon={<i className="fas fa-map-marker-alt"></i>}
                                        invalidMsg={invalid('address', errors)}
                                        formKey={formKey}
                                    />
                                </div>
                                <div className="form-row">
                                    <File
                                        label="Store Logo"
                                        onChange={() => { }}
                                        name="logo"
                                        id="logo"
                                        invalidMsg={invalid('logo', errors)}
                                        formKey={formKey}
                                    />
                                    <div className="form-group">
                                        <label htmlFor="productName">Gps Location</label>
                                        <input type="button" className="form-control btn btn-primary" defaultValue="Locate" />
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                    <button className="btn btn-outline-primary btn-block">Submit</button>
                </form>
            </div>
        </section>

    )
}

const mapStateToProps = (state) => ({
    getInputValue: (name) => {
        if (state.forms['store_form']) {
            if (state.forms['store_form'][name] !== null) {
                return state.forms['store_form'][name];
            }
        }
        return null;
    },
})

export default connect(mapStateToProps)(Create)