import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import category from '../../../api/category';
import Loading from '../../../directives/Loading';
import active from '../../../helpers/active';
import Category from './Category';
function SelectCategories({ formKey, invalidMsg, getInputValue }: { formKey: string, invalidMsg: Array<string>, getInputValue: Function }) {
    const [invMsg, setInvMsg] = useState(invalidMsg[0]);
    useEffect(() => {
        // => initialize invMsg state from invalidMsg prop
        setInvMsg(invalidMsg[0]);
    }, [invalidMsg]);

    const value = getInputValue(formKey, 'category');
    useEffect(() => {
        if (invMsg.length > 0) {
            setInvMsg('');
        }
    }, [value])


    const [categories, setCategories] = useState([]);
    useEffect(() => {
        category.index().then(res => setCategories(res.data));
    }, []);
    return (
        <>

            <div className={active(invMsg.length !== 0, { activeClass: 'is-invalid',defaultClass: 'show-categories'})}>
                <Loading state={categories.length > 0}>
                    {categories.map(c => <Category key={c.id} id={c.id} name={c.name} formKey={formKey} subCategories={c.sub_categories} />)}
                </Loading>
            </div>
            <div id="select-categories-feedback" className="invalid-feedback">
                {invMsg}
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    getInputValue: (key, name, defaultValue = false) => {
        // => key : represents form key in global store
        // => name : represents input name
        // => defaultValue : the value returnd if the input isn't registered yet in global state
        // => function return current value of particular input in particular form
        if (key && name) {
            // => check if the key an name is definded or not
            if (state.forms[key]) {
                // => check if the key of the form is registered in the form state or not
                // => return the value if it is defined or default value if it's not
                return state.forms[key][name] === undefined ? defaultValue : state.forms[key][name];
            }
        }
        return defaultValue;
    }
})
export default connect(mapStateToProps)(SelectCategories)