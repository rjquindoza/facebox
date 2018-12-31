import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import Header from 'components/Header'
import Home from 'containers/Home'
import FaceDetect from 'containers/FaceDetect'
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

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Router>
        <Container className="App">
          <Header />
          <Route path="/" exact component={LoadIndex} />
          <Route path="/face-detect" exact component={LoadFaceDetect} />
        </Container>
      </Router>
    )
  }
}

export default App
