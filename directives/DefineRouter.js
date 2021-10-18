import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Router } from '../redux/dispatcher';
function DefineRouter({ children }) {
    const router = useRouter();
    useEffect(() => Router.set(router), []);
    return (
        <>
            {children}
        </>
    )
}

export default connect(null)(DefineRouter);