import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import BranchForm from '../../components/general/BranchForm';
import File from '../../components/inputs/File';
import Number from '../../components/inputs/Number';
import Preview from '../../components/inputs/Preview';
import Select from '../../components/inputs/Select';
import Text from '../../components/inputs/Text';
import invalid from '../../helpers/invalid';
import { Forms, Main } from '../../redux/dispatcher';
import { compressPictures } from '../../helpers/compressPictures';
import imageCompression from 'browser-image-compression'
import branch from '../../api/branch';
import PermenantMessage from '../../components/messages/PermenantMessage';
import Form from '../../packeges/Form';
import Picture from '../../models/Picture';

function CreateBranch({ getInputValue, logo }) {
    const formKey = 'branch_form';
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
    // => attach form
    useEffect(() => {
        Forms.attachForm(formKey);
        return () => Forms.unattachForm(formKey);
    }, [])
    // => decide one branch or more
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
    // => decide same branches or different branches
    useEffect(() => {
        // => branches have same name(1) or not (0)
        const bool = parseInt(getInputValue('same_branches')); // return 0 or 1
        // => toggle [store_name,logo] inputs
        setInputDep((old) => ({ ...old, store_name: bool, logo: bool }));
        // => if not same then empty the pictures
        if (!bool) {
            Main.emptyPictures();
        }
    }, [getInputValue('same_branches')]);
    // => clear errors when moving from tap to another tap
    useEffect(() => {
        setErrors([]);
    }, [getInputValue('branches_number'), getInputValue('same_branches'), getInputValue('branches')]);
    // => render forms with number of required branches and update them with errors
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
                            // != this isn't updating
                            errors={errors}
                        />
                    )
                }
                setBranches(buffer);
            }
        }
    }, [getInputValue('branches_number'), getInputValue('same_branches'), getInputValue('branches'), errors]);
    // useEffect(() => {
    //     loader.load().then(() => {
    //         let googleMap = new google.maps.Map(map.current, {
    //             center: { lat: -34.397, lng: 150.644 },
    //             zoom: 8,s
    //         });
    //         new google.maps.Marker({
    //             position: { lat: -34.397, lng: 150.644 },
    //             map: googleMap,
    //         })
    //     });
    // });


    function logoInit(e) {
        // => save just one picture
        Main.emptyPictures();
        Picture.init(e);
    }

    async function branchCreate(e) {
        e.preventDefault();
        let formInstanse = new Form(e.target);
        let { form } = formInstanse;
        let structure = [];
        const addSingleLogo = async () => {
            if (logo[0]) {
                let compressedLogo = await imageCompression(logo[0].file, { maxSizeMB: .05 });
                return [
                    ['logo', { from: compressedLogo, type: 'free' }],
                    ['logo_position', { from: logo[0].positionToJson(), type: 'free'  }],
                ]
            }
            return [];
        }
        // => no branches
        if (!parseInt(getInputValue('branches'))) {
            // => if no branches add the compressed logo if it exists
            structure = await addSingleLogo();
        } else {
            // => have branches
            let length = parseInt(getInputValue('branches_number'));
            if (parseInt(getInputValue('same_branches'))) {
                // => same name , logo but different short names
                // => if no branches add the compressed logo if it exists
                const logoStr = await addSingleLogo();
                structure = [
                    ...logoStr,
                    ['short_branch_names[]', { from: 'short_branch_name-*', type: 'array', length }]
                ]
            } else {
                // => different name , logo
                let compressedPictures = await Promise.all(compressPictures(logo));
                let logos = compressedPictures.map((picture, i) => ({ file: picture, name: logo[i].id }))
                structure = [
                    ['logos[]', { from: logos, type: 'free-array', options: { customName: true } }],
                    ['logos_position[]', { from: logo.map(l => l.positionToJson()), type: 'free-array' }],
                    ['branch_names[]', { from: 'branch_name-*', type: 'array', length }],
                    ['logo-*', { type: 'clear', length }],
                ]
            }
            structure.push(['addresses[]', { from: 'address-*', type: 'array', length }]);
        }
        let str = new Map(structure);
        formInstanse.structure(str);
        try {
            let res = await branch.store(form);
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
        <section className="single-page-form">
            <div className="container">
                <div className="head">
                    <div className="title">
                        <h2>Create your E-Shop</h2>
                    </div>
                </div>
                <form className="form" onSubmit={branchCreate}>
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
                                <div className="row align-items-center flex-wrap">
                                    <File
                                        label="Store Logo"
                                        onChange={logoInit}
                                        name="logo"
                                        multiple={false}
                                        id="logo"
                                        addClass="col-sm-6"
                                        invalidMsg={invalid('logo', errors)}
                                        formKey={formKey}
                                    />
                                    <div className="col-sm-6">
                                        <div className="row justify-content-center">
                                            {logo.length > 0 ? <Preview picture={logo[0]} to="logo" /> : ''}
                                        </div>
                                    </div>
                                </div>
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
                                        name="store_name"
                                        id="store_name"
                                        icon={<i className="fas fa-store"></i>}
                                        invalidMsg={invalid('store_name', errors)}
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
                                    <div className="col-md-6">
                                        <div className="row align-items-center">
                                            <File
                                                label="Store Logo"
                                                onChange={logoInit}
                                                name="logo"
                                                multiple={false}
                                                id="logo"
                                                invalidMsg={invalid('logo', errors)}
                                                formKey={formKey}
                                            />
                                            <div className="col-md-6">
                                                <div className="row justify-content-center">
                                                    {logo.length > 0 ? <Preview picture={logo[0]} to="logo" /> : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Gps Location</label>
                                        <input type="button" className="form-control btn btn-primary" defaultValue="Locate" />
                                    </div>
                                </div>
                            </div>
                            : ''
                    }

                    {invalid('logos', errors, 'listOfErrors').map((e, i) => <PermenantMessage key={i} type="danger" content={e} />)}
                    <button className="btn btn-outline-primary btn-block">Submit</button>
                </form>
            </div>
        </section>
    )
}


const mapStateToProps = (state) => ({
    getInputValue: (name) => {
        if (state.forms['branch_form']) {
            if (state.forms['branch_form'][name]) {
                return state.forms['branch_form'][name];
            }
        }
        return null;
    },
    logo: state.main.pictures,
})

export default connect(mapStateToProps)(CreateBranch)