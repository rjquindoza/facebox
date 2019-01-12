import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import Header from 'components/Header'
import Home from 'containers/Home'
import FaceDetect from 'containers/FaceDetect'
import HowItWorks from 'containers/HowItWorks'
import SignIn from 'containers/SignIn'

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
`

const LoadIndex = () => <Home />
const LoadFaceDetect = () => <FaceDetect />
const LoadHowItWorks = () => <HowItWorks />
const LoadSignIn = () => <SignIn />

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Header />
          <Route path="/facebox" exact component={LoadIndex} />
          <Route path="/face-detect" exact component={LoadFaceDetect} />
          <Route path="/how-it-works" exact component={LoadHowItWorks} />
          <Route path="/sign-in" exact component={LoadSignIn} />
        </Container>
      </Router>
    )
  }
}

export default App
