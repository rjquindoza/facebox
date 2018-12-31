import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'components/Button'
import { Container, Heading, Divider } from './styled'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLink: ''
    }
  }

  onSubmit = () => {
    console.log('clicked')
  }

  render() {
    return (
      <Container className="flex flex-column">
        <Heading className="flex-auto flex flex-column justify-center items-start pl6">
          <h1 className="flex flex-column pa2 ma0">
            <span>MACHINE</span>
            <span>LEARNING</span>
            <span>UNLEASHED</span>
          </h1>
          <Divider className="mh2 mv3" />
          <div className="pa2">
            <h2>
              Class-leading computer vision AI platform building solutions for
              your business or personal use.
            </h2>
          </div>
          <Link to="/face-detect">
            <Button className="ma2">CHECK IT OUT</Button>
          </Link>
        </Heading>
      </Container>
    )
  }
}

export default Home
