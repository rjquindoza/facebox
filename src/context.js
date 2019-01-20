import React from 'react'

const defaultValue = {
  isLoggedIn: false,
  redirectToReferrer: false,
  user: {},
  handleLogin: () => {},
  handleSignOut: () => {}
}

const Context = React.createContext(defaultValue)

export default Context
