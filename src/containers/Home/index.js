import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Button from 'components/Button'
import Heading from 'components/Heading'
import { fonts } from 'styles/palette'

const Container = styled.div``

const Home = () => (
  <Container
    className="absolute flex flex-column justify-center"
    style={{ color: fonts.light, top: '50%', transform: 'translateY(-50%)' }}
  >
    <Heading>
      <Heading.H1 className="flex flex-column pa2 ma0">
        <span>MACHINE</span>
        <span>LEARNING</span>
        <span>UNLEASHED</span>
      </Heading.H1>
      <Heading.Divider className="mh2 mv3" />
      <div className="pa2">
        <Heading.H2>
          Class-leading computer vision AI platform building solutions for your
          business or personal use.
        </Heading.H2>
      </div>
      <Link to="/how-it-works">
        <Button className="ma2 b">LEARN MORE</Button>
      </Link>
    </Heading>
  </Container>
)

export default Home
