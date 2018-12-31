import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from 'components/Button'
import { fonts } from 'styles/palette'

const Container = styled.div`
  background-color: transparent;
  color: ${fonts.light};
  width: 100%;
  position: absolute;
`

const Brand = styled(Button)`
  h1 {
    color: ${fonts.primary};
    font-size: 1rem;
  }
`

const Header = () => (
  <nav>
    <Container className="flex justify-between items-center ph5">
      <Link to="/">
        <Brand className="pa3 transparent" size="small">
          <h1 className="ma0">FACE-BOX</h1>
        </Brand>
      </Link>
      <div>
        <ul className="flex list pa0">
          <li className="pa3">
            <Link to="/how-it-works">
              <Button color="transparent" size="small">
                How it works
              </Button>
            </Link>
          </li>
          <li className="pa3">
            <Link to="/sign-in">
              <Button color="transparent" size="small">
                Sign in
              </Button>
            </Link>
          </li>
          <li className="pa3">
            <Link to="/sign-up">
              <Button color="transparent" size="small">
                Sign up
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  </nav>
)

export default Header
