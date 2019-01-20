import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Header from 'components/Header'
import Home from 'containers/Home'
import FaceDetect from 'containers/FaceDetect'
import HowItWorks from 'containers/HowItWorks'
import SignIn from 'containers/SignIn'
import Register from 'containers/Register'
import Context from 'context'

import bg from 'assets/img/bg.jpg'

const Container = styled.div`
  position: relative;
  background: linear-gradient(
      to right,
      rgba(34, 36, 37, 0.6),
      rgba(64, 66, 68, 0.6)
    ),
    url(${bg}) no-repeat fixed center;
  background-size: cover;
  height: 100vh;
`

const LoadIndex = () => <Home />
const LoadFaceDetect = () => <FaceDetect />
const LoadHowItWorks = () => <HowItWorks />
const LoadSignIn = props => <SignIn {...props} />
const LoadRegister = props => <Register {...props} />

class App extends Component {
  state = {
    isLoggedIn: false,
    redirectToReferrer: false,
    user: {}
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      handleLogin: this.handleLogin,
      loadUser: this.loadUser
    }
  }

  privateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          this.state.isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/sign-in',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true, redirectToReferrer: true })
  }

  handleSignOut = () => {
    this.setState({ isLoggedIn: false, redirectToReferrer: false })
  }

  loadUser = user => {
    this.setState({ user })
  }

  render() {
    const { privateRoute: PrivateRoute } = this
    const { isLoggedIn, user } = this.state

    return (
      <Context.Provider value={this.state}>
        <Router>
          <Container>
            <Header
              isLoggedIn={isLoggedIn}
              user={user}
              handleSignOut={this.handleSignOut}
            />
            <Route path="/" exact component={LoadIndex} />
            <Route path="/how-it-works" exact component={LoadHowItWorks} />
            <Route path="/sign-in" component={LoadSignIn} />
            <Route path="/register" exact component={LoadRegister} />
            <PrivateRoute path="/face-detect" component={LoadFaceDetect} />
          </Container>
        </Router>
      </Context.Provider>
    )
  }
}

export default App
