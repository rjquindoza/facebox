import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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

class Register extends Component {
  state = {
    isLoggedIn: false,
    isLoading: false,
    name: '',
    username: '',
    password: ''
  }

  onUsernameChange = e => {
    this.setState({ username: e.target.value })
  }

  onNameChange = e => {
    this.setState({ name: e.target.value })
  }

  onPasswordChange = e => {
    this.setState({ password: e.target.value })
  }

  onSubmit = (handleLogin, loadUser) => {
    const { username, name, password } = this.state
    this.setState({ isLoading: true })

    fetch(`${API.URL}/register`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
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
                <Title>Sign Up</Title>
                <div className="mb1">
                  <Form.Input
                    onChange={this.onNameChange}
                    id="name"
                    name="name"
                    label="Name"
                    placeholder="Name"
                    type="text"
                  />
                </div>
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
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <Button
                  onClick={() => this.onSubmit(handleLogin, loadUser)}
                  className="self-end"
                  size="small"
                  color="secondary"
                >
                  Register
                </Button>
              </FormContainer>
            </Container>
          )
        }
      </Context.Consumer>
    )
  }
}

export default Register
