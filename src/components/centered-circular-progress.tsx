import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import { ReactNode } from 'react'

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vh',
  position: 'relative',
  flexDirection: 'column',
})

const CenteredText = styled('span')({
  marginTop: '0.5rem',
  fontSize: '1rem',
  fontWeight: 'bold',
})

export const CenteredCircularProgress = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <Container>
      <CircularProgress />
      <CenteredText>{children}</CenteredText>
    </Container>
  )
}
