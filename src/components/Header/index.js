import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from 'components/Button'
import { fonts } from 'styles/palette'

const Container = styled.div`
  background-color: transparent;
  color: ${fonts.light};
  width: 100%;
`

const Brand = styled(Button)`
  h1 {
    color: ${fonts.primary};
    font-size: 1rem;
  }
`

const Header = ({ isLoggedIn, user, handleSignOut }) => (
  <nav className="pv3">
    <Container className="flex justify-between items-center ph5">
      <Link to="/facebox">
        <Brand className="pa3 transparent" size="small">
          <h1 className="ma0">FACE-BOX</h1>
        </Brand>
      </Link>
      <div>
        <ul className="flex list pa0">
          {isLoggedIn ? (
            <Fragment>
              <li className="">
                <Button color="transparent" size="small">
                  Hello, &nbsp;
                  {user.name}
                </Button>
              </li>
              <li className="">
                <Link to="/sign-in">
                  <Button
                    onClick={handleSignOut}
                    color="transparent"
                    size="small"
                  >
                    Sign out
                  </Button>
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="pr2">
                <Link to="/how-it-works">
                  <Button color="transparent" size="small">
                    How it works
                  </Button>
                </Link>
              </li>
              <li className="mr3">
                <Link to="/sign-in">
                  <Button color="transparent" size="small">
                    Sign in
                  </Button>
                </Link>
              </li>
              <li className="">
                <Link to="/register">
                  <Button size="small">Sign up</Button>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </Container>
  </nav>
)

export default Header
