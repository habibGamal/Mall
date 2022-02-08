import React, { useState } from 'react'
import CheckBox from '../../components/inputs/CheckBox';
import Email from '../../components/inputs/Email';
import Password from '../../components/inputs/Password';
import Select from '../../components/inputs/Select';
import Text from '../../components/inputs/Text'
import invalid from '../../helpers/invalid'
import store from '../../api/store'
import Period from '../../components/inputs/Period';
import InputGroup from '../../components/inputs/InputGroup';
import Form from '../../packeges/Form';
import StoreFormRequest from '../../FormRequests/StoreFormRequset';
import t, { translate } from '../../helpers/translate';
import { connect } from 'react-redux';
function CreateStore() {
    const formKey = 'store_form';
    const [errors, setErrors] = useState(null);
    const week = [
        'Friday',
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Work every day'
    ]
    async function storeCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const rawForm: FormData = new FormData(e.currentTarget);
        const storeFormRequest = new StoreFormRequest();
        const createRequestForm = storeFormRequest.create(rawForm);
        try {
            const res = await store.store(createRequestForm);
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
                        <h2>{t('Create your store account', 'انشئ متجرك الان')}</h2>
                    </div>
                </div>
                <form onSubmit={storeCreate} className="form">
                    <div className="groups">
                        <h3>{t('Personal Info', 'البيانات الشخصية')}</h3>
                        <div className="form-row">
                            <Text
                                label={t('Shop owner name', 'اسم صاحب المتجر')}
                                icon={<i className="fas fa-store" />}
                                name="name"
                                id="name"
                                invalidMsg={invalid('name', errors)}
                                formKey={formKey}
                            />
                            <Text
                                label={t('Phone Number', 'رقم الهاتف')}
                                id="phone_number"
                                name="phone_number"
                                icon={<i className="fas fa-phone-alt"></i>}
                                formKey={formKey}
                                invalidMsg={invalid('phone_number', errors)}
                            />
                        </div>
                        <div className="form-row">
                            <Email
                                label={t('Email address', 'البريد الالكتروني')}
                                id="email"
                                name="email"
                                icon={<i className="fas fa-user"></i>}
                                formKey={formKey}
                                invalidMsg={invalid('email', errors)}
                            />
                            <Password
                                label={t('Password', 'الرقم السري')}
                                id="password"
                                name="password"
                                icon={<i className="fas fa-key" />}
                                formKey={formKey}
                                invalidMsg={invalid('password', errors)}
                            />
                        </div>
                        <div className="form-row">
                            <Password
                                label={t('Confirm Password', 'تأكيد الرقم السري')}
                                id="password_confirmation"
                                name="password_confirmation"
                                icon={<i className="fas fa-key" />}
                                formKey={formKey}
                                invalidMsg={invalid('password_confirmation', errors)}
                            />
                            <Text
                                label={t('Id Card', 'الرقم القومي للبطاقة الشخصية')}
                                id="card_id"
                                name="card_id"
                                icon={<i className="fas fa-id-card"></i>}
                                formKey={formKey}
                                invalidMsg={invalid('card_id', errors)}
                            />
                        </div>
                    </div>
                    <div className="groups">
                        <h3>{t('Requirements', 'بيانات عن المتجر')}</h3>
                        <div className="form-row">
                            <Select
                                label={t('Governorate', 'المحافظة')}
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
                                label={t('Can returned', 'استرجاع المنتج')}
                                options={[
                                    { value: 1, as: t('This product can be returned', 'يمكن استرجاعه') },
                                    { value: 0, as: t('This product can NOT be returned', 'لا يمكن استرجاعه') },
                                ]}
                                name="can_return"
                                id="can_return"
                                invalidMsg={invalid('can_return', errors)}
                                formKey={formKey}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="productName">{t('Holidays','الاجازات')}</label>
                                <InputGroup id="holidays" addClass="form-row" invalidMsg={invalid('holidays', errors)}>
                                    <div className="form-row">
                                        {
                                            week.map((day, i) => (
                                                <CheckBox
                                                    key={i}
                                                    label={day}
                                                    addClass=""
                                                    id={day.toLocaleLowerCase().split(' ').join('_')}
                                                    name="holidays"
                                                    value={day}
                                                    formKey={formKey}
                                                />
                                            ))
                                        }
                                    </div>
                                </InputGroup>
                            </div>
                            <Period
                                label={t('Work hours', 'عدد ساعات العمل')}
                                name="work_hours"
                                formKey={formKey}
                                invalidMsg={invalid('work_hours', errors, 'period')}
                            />
                        </div>
                        <div className="form-row">
                            <Text
                                label={t('Business Type', 'نوع العمل')}
                                icon={<i className="fas fa-shopping-bag" />}
                                name="business_type"
                                id="business_type"
                                invalidMsg={invalid('business_type', errors)}
                                formKey={formKey}
                            />
                            <Select
                                label={t('Work From', 'بيئة العمل')}
                                name="work_from"
                                id="work_from"
                                invalidMsg={invalid('work_from', errors)}
                                formKey={formKey}
                                options={[
                                    { value: 1, as: t('Shop','أعمل من متجر') },
                                    { value: 0, as: t('Home','أعمل من المنزل') },
                                ]}
                            />
                        </div>
                    </div>
                    <button className="btn btn-outline-primary btn-block">Submit</button>
                </form>
            </div>
        </section>

    )
}

export default connect(translate)(CreateStore);