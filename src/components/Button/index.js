import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import cx from 'classnames'
import { colors } from 'styles/palette'

const StyledBtn = styled.button`
  background-color: ${colors.primary};
  border: 0;
  border-radius: 2px;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  padding: 1.2rem 4rem;
  transition: all 0.2s ease-out;

  &:active,
  &:focus {
    outline: none;
  }

  &:active {
    box-shadow: 0;
    transform: translateY(1px);
  }

  &:hover {
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.5);
    opacity: 0.8;
  }

  &.small {
    padding: 0.5rem 1rem;
  }

  &.transparent {
    background: transparent;
    &:hover {
      box-shadow: none;
      opacity: 0.8;
    }
  }

  &.secondary {
    background: ${colors.secondary};
  }
`

const Button = ({ children, className, color, size, ...rest }) => {
  const classes = cx(
    className,
    color === 'transparent' ? 'transparent' : '',
    color === 'secondary' ? 'secondary' : '',
    size === 'small' ? 'small' : ''
  )
  return (
    <StyledBtn className={classes} {...rest}>
      {children}
    </StyledBtn>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['transparent', 'primary', 'secondary']),
  size: PropTypes.oneOf(['small'])
}

export default Button
