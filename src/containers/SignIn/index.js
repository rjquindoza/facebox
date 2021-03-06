import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { RingLoader } from 'react-spinners'

import Button from 'components/Button'
import Form from 'components/Form'
import Context from 'context'
import { colors } from 'styles/palette'
import { API } from 'cdn'

const Container = styled.div``

const FormContainer = styled.div`
  height: 50vh;
  width: 50vh;
  background: linear-gradient(45deg, ${colors.primary}, ${colors.secondary});
`

const Title = styled.h2`
  font-size: 2rem;
`

class SignIn extends Component {
  state = {
    isLoggedIn: false,
    redirectToReferrer: false,
    isLoading: false,
    username: '',
    password: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.state
    }
  }

  onUsernameChange = e => {
    this.setState({ username: e.target.value })
  }

  onPasswordChange = e => {
    this.setState({ password: e.target.value })
  }

  onSubmit = (handleLogin, loadUser) => {
    const { username, password } = this.state
    this.setState({ isLoading: true })

    fetch(`${API.URL}/sign-in`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(res => res.json())
      .then(user => {
        this.setState({ isLoading: false })
        if (user.login) {
          handleLogin()
          loadUser(user)
        }
      })
      .catch(err => {
        this.setState({ isLoading: false })
        console.log(err)
      })
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/face-detect' }
    }

    const { isLoading } = this.state

    return (
      <Context.Consumer>
        {({ handleLogin, loadUser, isLoggedIn, redirectToReferrer }) =>
          isLoggedIn && redirectToReferrer ? (
            <Redirect to={from} />
          ) : (
            <Container
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div
                className="flex justify-center mb2"
                style={{ height: '3rem' }}
              >
                <RingLoader
                  sizeUnit={'rem'}
                  size={3}
                  color={colors.primary}
                  loading={isLoading}
                />
              </div>
              <FormContainer className="center flex flex-column justify-around pv3 ph4 br2 shadow-5">
                <Title>Sign In</Title>
                <div className="mb1">
                  <Form.Input
                    onChange={this.onUsernameChange}
                    id="username"
                    name="username"
                    label="Username"
                    placeholder="Username"
                    type="text"
                  />
                </div>
                <div>
                  <Form.Input
                    onChange={this.onPasswordChange}
                    id="password"
                    name="current-password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <div className="flex justify-between">
                  <Link to="/register">
                    <Button className="self-end" size="small" color="secondary">
                      Register
                    </Button>
                  </Link>
                  <Button
                    onClick={() => this.onSubmit(handleLogin, loadUser)}
                    className="self-end"
                    size="small"
                    color="secondary"
                  >
                    Sign-in
                  </Button>
                </div>
              </FormContainer>
            </Container>
          )
        }
      </Context.Consumer>
    )
  }
}

export default SignIn
