import React from 'react'
import { connect } from 'react-redux';
// => for display content require that admin to be loged in
function Admin({ authenticated, children }) {
  return (
    <>
      {
        authenticated ? children : ''
      }
    </>
  )
}

const mapStateToProps = state => ({
  authenticated: state.main.authenticated.admin,
})

export default connect(mapStateToProps)(Admin);