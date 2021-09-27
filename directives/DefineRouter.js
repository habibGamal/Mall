import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import {setRouter} from '../redux/actions/router'
function DefineRouter({children,setRouter}) {
    const router = useRouter();
    useEffect(()=>setRouter(router),[]);
    return (
        <>
            {children}
        </>
    )
}

  
const mapDispatchToProps = {
setRouter,
}
  
export default connect(null, mapDispatchToProps)(DefineRouter);