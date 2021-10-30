import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import auth from '../../../api/auth';
import invalid from '../../../helpers/invalid';
import { $Async } from '../../../redux/asyncActions';
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
                    'email':data.get('email'),
                    'password':data.get('password'),
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
                label="Enter your name"
                addClass=""
                id="name"
                name="name"
                formKey={formKey}
                invalidMsg={invalid('name', errors)}
            />
            <Email
                label="Email address"
                addClass=""
                id="email"
                name="email"
                formKey={formKey}
                invalidMsg={invalid('email', errors)}
            />
            <Password
                label="Password"
                addClass=""
                id="password"
                name="password"
                formKey={formKey}
                invalidMsg={invalid('password', errors)}
            />
            <Password
                label="Confirm Password"
                addClass=""
                id="password_confirmation"
                name="password_confirmation"
                formKey={formKey}
                invalidMsg={invalid('password_confirmation', errors)}
            />
            <Select 
                label="Gender"
                addClass=""
                id="gender"
                name="gender"
                formKey={formKey}
                invalidMsg={invalid('gender', errors)}
                options={
                    [
                        {value:0,as:'Male'},
                        {value:1,as:'Female'},
                    ]
                }
            />
            <div className="login-or-register">
                <button onClick={signup} type="submit" className="btn btn-black btn-lg btn-block">Sign up</button>
                <span>You have an account ?<br /><button onClick={loginLayout} className="btn btn-link">Login</button></span>
            </div>
        </>
    )
}
