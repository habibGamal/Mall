import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import auth from '../../../api/auth';
import invalid from '../../../helpers/invalid';
import t from '../../../helpers/translate';
import { $Async } from '../../../redux/async_actions';
import { Forms } from '../../../redux/dispatcher';
import Email from '../../inputs/Email'
import Password from '../../inputs/Password'
import Select from '../../inputs/Select';
import Text from '../../inputs/Text';

export default function Signup({ form, setTap }) {
    const formKey = 'signup_form';
    const [errors, setErrors] = useState(null);
    const router = useRouter();
    useEffect(() => {
        Forms.attachForm(formKey);
        return () => {
            Forms.unattachForm(formKey);
        }
    }, []);
    async function signup(e) {
        e.preventDefault();
        let data = new FormData(form.current);
        try {
            let res = await auth.register(data);
            if (res.status === 201) {
                Forms.emptyForm(formKey);
                await auth.login({
                    'email': data.get('email'),
                    'password': data.get('password'),
                });
                $Async.Reauth();
                router.push('/');
            }
        } catch (err) {
            if (err.response.status === 422) {
                setErrors(err.response.data.errors);
            }
        }
    }
    function loginLayout(e) {
        e.preventDefault();
        setTap('login');
    }
    return (
        <>
            <Text
                label={t('Enter your name', 'اسمك')}
                addClass=""
                id="name"
                name="name"
                formKey={formKey}
                invalidMsg={invalid('name', errors)}
            />
            <Email
                label={t('Email address', 'البريد الالكتروني')}
                addClass=""
                id="email"
                name="email"
                formKey={formKey}
                invalidMsg={invalid('email', errors)}
            />
            <Password
                label={t('Password', 'كلمة المرور')}
                addClass=""
                id="password"
                name="password"
                formKey={formKey}
                invalidMsg={invalid('password', errors)}
            />
            <Password
                label={t('Confirm Password', 'تأكيد كلمة المرور')}
                addClass=""
                id="password_confirmation"
                name="password_confirmation"
                formKey={formKey}
                invalidMsg={invalid('password_confirmation', errors)}
            />
            <Select
                label={t('Gender', 'جنسك')}
                addClass=""
                id="gender"
                name="gender"
                formKey={formKey}
                invalidMsg={invalid('gender', errors)}
                options={
                    [
                        { value: 0, as: t('Male','رجل') },
                        { value: 1, as: t('Female','انثى') },
                    ]
                }
            />
            <div className="login-or-register">
                <button onClick={signup} type="submit" className="btn btn-black btn-lg btn-block">{t('Sign up', 'انشاء حساب')}</button>
                <span>{t('You have an account ?','لديك حساب بالفعل ؟')}<br /><button onClick={loginLayout} className="btn btn-link">{t('Login', 'تسجيل دخول')}</button></span>
            </div>
        </>
    )
}
