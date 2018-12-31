import React, { Component } from 'react'
import Input from './Input'

class Form extends Component {
  static Input = props => {
    return <Input {...props} />
  }
}

export default Form
