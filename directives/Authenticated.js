import React from 'react'
import { connect } from 'react-redux';
// => for display content require that user to be loged in
function Authenticated({ authenticated, children }) {
  return (
    <>
      {
        authenticated ? children : ''
      }
    </>
  )
}

const mapStateToProps = state => ({
  authenticated: state.main.authenticated.user,
})

export default connect(mapStateToProps)(Authenticated);