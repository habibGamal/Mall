import React from 'react'
import { connect } from 'react-redux';
// => for display content when user is not loged in
function Unauthenticated({ guest, children }) {
    return (
        <>
        {
          guest ?  children :''
        }
      </>
    )
}

const mapStateToProps = state => ({
  guest: state.main.authenticated.guest,
})
  
export default connect(mapStateToProps)(Unauthenticated);