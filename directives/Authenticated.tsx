import React from 'react'
import { connect } from 'react-redux';
// => for display content require that user to be loged in
function Authenticated({ guest, children }) {
  return (
    <>
      {
        !guest ? children : ''
      }
    </>
  )
}

const mapStateToProps = state => ({
  guest: state.main.authenticated.guest,
})

export default connect(mapStateToProps)(Authenticated);