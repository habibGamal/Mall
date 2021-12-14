import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import auth from '../../../api/auth';
import invalid from '../../../helpers/invalid';
import { $Async } from '../../../redux/asyncActions';
import { Forms } from '../../../redux/dispatcher';
import Email from '../../inputs/Email'
import Password from '../../inputs/Password'

export default function BusinessLogin({form ,setTap}) {
    const formKey = 'business_login_form';
    const [errors, setErrors] = useState(null);
    const router = useRouter();
    useEffect(() => {
        Forms.attachForm(formKey);
        return () => {
            Forms.unattachForm(formKey);
        }
    }, []);
    async function login(e) {
        e.preventDefault();
        let data = new FormData(form.current);
        try{
            let res = await auth.adminLogin(data);
            if (res.status === 200) {
                Forms.emptyForm(formKey);
                $Async.Reauth();
                router.push('/');
            }
        }catch(err){
            if(err.response.status === 422){
                setErrors(err.response.data.errors);
            }
        }
    }
    function createStore(e) {
        e.preventDefault();
        router.push('/store/create');
    }
    return (
        <>
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
            <div className="login-or-register">
                <button onClick={login} type="submit" className="btn btn-black btn-lg btn-block">Login</button>
                <span>Don{`'`}t have an store?<br /><button onClick={createStore} className="btn btn-link">Create Store Now</button></span>
            </div>
        </>
    )
}
