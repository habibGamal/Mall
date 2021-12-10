import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { $Async } from '../redux/asyncActions';
import Loading from './Loading';
function Authenticating({ authenticated, children }) {
  useEffect(() => {
    $Async.Reauth();
  }, [])
  return (
    <Loading state={authenticated !== null}>
      {children}
    </Loading>
  )
}


const mapStateToProps = state => ({
  authenticated: state.main.authenticated,
})


export default connect(mapStateToProps)(Authenticating);