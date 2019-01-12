import React from 'react'
import styled from 'styled-components'

import Button from 'components/Button'
import Form from 'components/Form'
import { colors } from 'styles/palette'

const Container = styled.div`
  height: 100vh;
`

const FormContainer = styled.div`
  height: 50vh;
  width: 50vh;
  background: linear-gradient(45deg, ${colors.primary}, ${colors.secondary});
`

const Title = styled.h2`
  font-size: 2rem;
`

const SignIn = () => (
  <Container className="flex justify-center items-center">
    <FormContainer className="flex flex-column justify-around pv3 ph4 br2 shadow-5">
      <Title>Sign In</Title>
      <div className="mb1">
        <Form.Input
          id="username"
          label="Username"
          placeholder="Username"
          type="text"
        />
      </div>
      <div>
        <Form.Input
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
      </div>
      <Button className="self-end" size="small">
        Sign-in
      </Button>
    </FormContainer>
  </Container>
)

export default SignIn
