import React from 'react'
import { connect } from 'react-redux';
// => for display content when user is not loged in
function Unauthenticated({ authenticated, children }) {
    return (
        <>
        {
          authenticated ? '' : children
        }
      </>
    )
}

const mapStateToProps = state => ({
authenticated: state.main.authenticated,
})
  
export default connect(mapStateToProps)(Unauthenticated);