import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Button from 'components/Button'
import Heading from 'components/Heading'
import { fonts } from 'styles/palette'

const Container = styled.div`
  height: 100vh;
`

const Home = () => (
  <Container className="flex flex-column" style={{ color: fonts.light }}>
    <Heading>
      <Heading.H1 className="flex flex-column pa2 ma0">
        <span>CLARIFAI</span>
        <span>SOLUTIONS</span>
      </Heading.H1>
      <Heading.Divider className="mh2 mv3" />
      <div className="pa2">
        <Heading.H2>
          <span>
            The leading computer vision AI platform for real-world business
            problems.
          </span>
          <span>
            The problems that your business encounters don’t change very often.
            The way you can solve those problems just has, with Clarifai.
          </span>
        </Heading.H2>
      </div>
      <Link to="/face-detect">
        <Button className="ma2 b">DEMO</Button>
      </Link>
    </Heading>
  </Container>
)

export default Home
