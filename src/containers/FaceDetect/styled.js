import styled from 'styled-components'
import { colors } from 'styles/palette'

export const FormContainer = styled.div`
  width: 50%;
`

export const InputContainer = styled.div`
  background: linear-gradient(45deg, ${colors.primary}, #5e227f);
  border-radius: 3px;
  box-shadow: 0 1rem 5rem rgba(#000, 0.5);
  width: 100%;
  padding: 2rem;
`

export const ImageContainer = styled.div`
  height: 60%;
`

export const BoundingBox = styled.div`
  border: 2px solid ${colors.primary};
  height: ${props => (props.height ? props.height : 0)};
  width: ${props => (props.width ? props.width : 0)};
  top: ${props => (props.top ? props.top : 0)};
  left: ${props => (props.left ? props.left : 0)};
`
