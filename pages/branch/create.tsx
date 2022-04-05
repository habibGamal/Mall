import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import Select from '../../components/inputs/Select';
import invalid from '../../helpers/invalid';
import { Forms, Main } from '../../redux/dispatcher';
import branch from '../../api/branch';
import PermenantMessage from '../../components/messages/PermenantMessage';
import CreateSingleBranch from '../../components/create-branch/CreateSingleBranch';
import CreateMultiSameBranches from '../../components/create-branch/CreateMultiSameBranches';
import BranchFormRequest from '../../FormRequests/BranchFormRequest';
import CreateMultiDifferentBranches from '../../components/create-branch/CreateMultiDifferentBranches';
import t from '../../helpers/translate';
interface CreateBranchSettings {
    multiBranchs: boolean; // 1 single , 0 multible
    sameBrand: boolean; // 1 same , 0 different
}
enum CreateBranchTap {
    Single,
    MultiSame,
    MultiDifferent,
}
function CreateBranch({ getInputsValue, logo }) {
    const { branches, same_branches, branches_number } = getInputsValue || {};
    const [errors, setErrors] = useState(null);
    const [settings, setSettings] = useState({
        multiBranchs: false,
        sameBrand: true,
    } as CreateBranchSettings);
    const [tap, setTap] = useState(CreateBranchTap.Single as CreateBranchTap);
    // => attach form
    useEffect(() => {
        Forms.attachForm(BranchFormRequest.createKey);
        return () => {
            Forms.unattachForm(BranchFormRequest.createKey)
            Main.emptyPictures();
        };
    }, [])

    useEffect(() => {
        // => one branch(0) or mulitble(1)
        if (branches !== null) {
            setSettings(
                old => ({
                    ...old,
                    multiBranchs: parseInt(branches) ? true : false,
                })
            );
        }
    }, [branches]);

    useEffect(() => {
        // => different (0) or same(1)
        if (same_branches !== null) {
            setSettings(
                old => ({
                    ...old,
                    sameBrand: parseInt(same_branches) ? true : false,
                })
            );
        }
    }, [same_branches]);

    useEffect(() => {
        if (!settings.multiBranchs) {
            setTap(CreateBranchTap.Single);
        } else if (settings.multiBranchs && settings.sameBrand) {
            setTap(CreateBranchTap.MultiSame);
        } else if (settings.multiBranchs && !settings.sameBrand) {
            setTap(CreateBranchTap.MultiDifferent);
        }
    }, [settings]);

    async function branchCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const rawForm: FormData = new FormData(e.currentTarget);
        const branchFormRequest = new BranchFormRequest();
        const numberOfBranches = parseInt(branches_number ?? 2);
        let createRequestForm: FormData;
        if (tap === CreateBranchTap.Single) {
            createRequestForm = await branchFormRequest.createSingleBranch(rawForm, logo);
        } else if (tap === CreateBranchTap.MultiSame) {
            createRequestForm = await branchFormRequest.createMultiSameBranches(rawForm, logo, numberOfBranches);
        } else if (tap === CreateBranchTap.MultiDifferent) {
            createRequestForm = await branchFormRequest.createMultiDifferentBranches(rawForm, logo, numberOfBranches);
        }
        try {
            const res = await branch.store(createRequestForm);
        } catch (err) {

            if (err.response) {
                let { data, status } = err.response;
                if (status == 422) {
                    setErrors(data.errors);
                }
            }
        }
    }

    function getTap(tap: CreateBranchTap) {
        switch (tap) {
            case CreateBranchTap.Single:
                return <CreateSingleBranch errors={errors} />;
            case CreateBranchTap.MultiDifferent:
                return <CreateMultiDifferentBranches errors={errors} />;
            case CreateBranchTap.MultiSame:
                return <CreateMultiSameBranches errors={errors} />;
            default:
                return <CreateSingleBranch errors={errors} />;
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
                        <h3>{t('Shop Details', 'تفاصيل المتجر')}</h3>
                        <Select
                            label={t('Branches', 'الافرع')}
                            name="branches"
                            id="branches"
                            addClass=""
                            invalidMsg={invalid('branches', errors)}
                            formKey={BranchFormRequest.createKey}
                            options={[
                                { value: 0, as: t('Just one branch', 'فرع واحد فقط') },
                                { value: 1, as: t('Multiple branches', 'اكثر من فرع') },
                            ]}
                        />
                    </div>
                    {
                        settings.multiBranchs
                            ?
                            <Select
                                label=""
                                name="same_branches"
                                id="same_branches"
                                addClass=""
                                invalidMsg={invalid('same_branches', errors)}
                                formKey={BranchFormRequest.createKey}
                                options={[
                                    { value: 1, as: t('All branches have the same name', 'كل الافرع لها نفس الاسم') },
                                    { value: 0, as: t('Each Branch has different name', 'كل فرع له اسم مختلف') },
                                ]}
                            />

                            : ''
                    }
                    {getTap(tap)}
                    {invalid('logos', errors, 'listOfErrors').map((e, i) => <PermenantMessage key={i} type="danger" content={e} />)}
                    <button className="btn btn-outline-primary btn-block">Submit</button>
                </form>
            </div >
        </section >
    )
}



const mapStateToProps = (state) => ({
    getInputsValue: state.forms?.[BranchFormRequest.createKey],
    logo: state.main.pictures,
})

export default connect(mapStateToProps)(CreateBranch)