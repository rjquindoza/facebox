import React from 'react'
import styled from 'styled-components'
import { fonts } from 'styles/palette'

const InputStyled = styled.input`
  background: none;
  border: 1px solid ${fonts.light};
  border-radius: 3px;
  display: block;
  padding: 0.5rem 0.5rem;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: 0 1rem 2rem rgba(#000, 0.1);
  }

  &:placeholder-shown + label {
    transform: translateY(-2rem);
  }

  &::-webkit-input-placeholder {
    opacity: 0;
    visibility: hidden;
  }
`

const Label = styled.label`
  color: #a9a9a9;
  cursor: text;
  font-size: 0.9rem;
  font-weight: 400;
  display: block;
  padding-left: 0.5rem;
  transform: translateY(0);
  transition: all 0.3s;
`

const Input = ({ id, label, placeholder, ...rest }) => (
  <div className="w-100">
    <InputStyled id={id} placeholder={placeholder} type="text" {...rest} />
    {label && <Label htmlFor={id}>{label}</Label>}
  </div>
)

export default Input
