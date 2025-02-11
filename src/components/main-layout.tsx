import { Paper, PaperProps, styled } from '@mui/material'
import { FC } from 'react'

const StyledPaper = styled(Paper)({
    maxWidth: 800,
    width: '100%',
    padding: '0.5rem',
    height: '100%',
    minHeight: '34rem',
    position: 'relative',
    display: "flex",
    flexDirection: 'column',
})

export const MainLayout: FC<PaperProps> = (props) => {
    return (
        <StyledPaper
            elevation={1}
            {...props}
        />
    )
}
