import styled from 'styled-components'
import { fonts } from 'styles/palette'

export const Container = styled.div`
  height: 100vh;
`

export const Heading = styled.header`
  color: ${fonts.light};

  & h1 {
    font-size: 5rem;
    font-weight: 600;
    line-height: 1;
  }

  & h2 {
    font-size: 1.3rem;
    font-weight: 300;
    width: 70%;
  }
`

export const Divider = styled.div`
  background: ${fonts.primary};
  height: 5px;
  width: 40px;
`
