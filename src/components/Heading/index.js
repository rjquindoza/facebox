import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fonts } from 'styles/palette'

const Container = styled.div`
  color: inherit;
`

const H1 = styled.h1`
  font-size: 5rem;
  font-weight: 600;
  line-height: 1;
`

const H2 = styled.h2`
  font-size: 1.3rem;
  font-weight: 300;
  width: 70%;
`

const Divider = styled.div`
  background: ${fonts.primary};
  height: 5px;
  width: 40px;
`

class Heading extends Component {
  static H1 = ({ children, ...rest }) => {
    return <H1 {...rest}>{children}</H1>
  }

  static H2 = ({ children, ...rest }) => {
    return <H2 {...rest}>{children}</H2>
  }

  static Divider = props => {
    return <Divider {...props} />
  }

  render() {
    const { children } = this.props
    return (
      <Container className="flex-auto flex flex-column justify-center items-start pl6">
        {children}
      </Container>
    )
  }
}

Heading.propTypes = {
  children: PropTypes.node.isRequired
}

export default Heading
