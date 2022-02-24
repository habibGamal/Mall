import React from 'react'
import { connect } from 'react-redux';
// => for display content require that user to be loged in
function Authenticated({ auth, guard, children }:{ auth:any,guard?:string,children:Array<JSX.Element>|JSX.Element}) {
  const { user, admin, guest } = auth;
  if (guard == 'admin')
    return (
      <>
        {
          admin ? children : ''
        }
      </>
    )
  if (guard == 'user')
    return (
      <>
        {
          user ? children : ''
        }
      </>
    )
  if (guard == null)
    return (
      <>
        {
          !guest ? children : ''
        }
      </>
    )
}

const mapStateToProps = state => ({
  auth: state.main.authenticated,
})

export default connect(mapStateToProps)(Authenticated);