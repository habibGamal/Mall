import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Reauth } from '../redux/actions/auth';
function Authenticating({ authenticated, Reauth, children }) {
  useEffect(()=>{
    Reauth();
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

const mapDispatchToProps = {
  Reauth,
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticating);