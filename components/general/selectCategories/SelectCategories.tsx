import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import category from '../../../api/category';
import Loading from '../../../directives/Loading';
import active from '../../../helpers/active';
import Category from './Category';
function SelectCategories({ formKey, invalidMsg, getInputsValue }: { formKey: string, invalidMsg: Array<string>, getInputsValue: any }) {
    const [invMsg, setInvMsg] = useState(invalidMsg[0]);
    useEffect(() => {
        // => initialize invMsg state from invalidMsg prop
        setInvMsg(invalidMsg[0]);
    }, [invalidMsg]);

    const { category:categoryValue } = getInputsValue || {};
    useEffect(() => {
        if (invMsg.length > 0) {
            setInvMsg('');
        }
    }, [categoryValue])

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        category.index().then(res => setCategories(res.data));
    }, []);
    return (
        <>
            <div className={active(invMsg.length !== 0, { activeClass: 'is-invalid', defaultClass: 'show-categories' })}>
                <Loading state={categories.length > 0} mini={true}>
                    {categories.map(c => <Category key={c.id} id={c.id} name={c.name} formKey={formKey} subCategories={c.sub_categories} />)}
                </Loading>
            </div>
            <div id="select-categories-feedback" className="invalid-feedback">
                {invMsg}
            </div>
        </>
    )
}

const mapStateToProps = (state, { formKey }) => ({
    getInputsValue: state.forms?.[formKey]
})
export default connect(mapStateToProps)(SelectCategories)