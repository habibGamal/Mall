import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { $Async } from '../redux/asyncActions';
function Authenticating({ authenticated, children }) {
  useEffect(()=>{
    $Async.Reauth();
  },[])
  return (
    <>
      {
        authenticated === null ? 'loading' : children
      }
    </>
  )
}


const mapStateToProps = state => ({
  authenticated: state.main.authenticated,
})


export default connect(mapStateToProps)(Authenticating);