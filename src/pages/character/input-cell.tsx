import { FC, useRef, useState } from 'react'
import {
  Paper,
  Box,
  TextField,
  Typography,
  Divider,
  IconButton,
  TextFieldProps,
  styled,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.25rem;
`

const StyledBox = styled(Box)`
  width: 100%;
  padding: 0.5rem;
`

const StyledTypography = styled(Typography)`
  font-size: 1.75rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const StyledDivider = styled(Divider)`
  height: 3.75rem;
  margin: 0.125rem;
`

const StyledIconButton = styled(IconButton)`
  padding: 0.625rem;
`

export const InputCell: FC<
  TextFieldProps & { value: string; description?: string }
> = ({ value, description, ...inputBaseProps }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditEnabled, setIsEditEnabled] = useState(false)
  const [savedName, setSavedName] = useState(value)

  const handleSave = () => {
    if (!inputRef.current) {
      return
    }

    setSavedName(inputRef.current.value)
    setIsEditEnabled(false)
  }

  return (
    <StyledPaper elevation={2}>
      <StyledBox>
        <StyledTypography>
          <Typography component='span'>{description}</Typography>
          {savedName}
        </StyledTypography>
        {isEditEnabled && (
          <TextField
            sx={{ m: 1, flex: 1 }}
            fullWidth
            variant='filled'
            defaultValue={value}
            inputRef={inputRef}
            disabled={!isEditEnabled}
            {...inputBaseProps}
          />
        )}
      </StyledBox>

      <StyledDivider orientation='vertical' />

      <StyledIconButton
        color='primary'
        aria-label='save'
        type='button'
        onClick={handleSave}
      >
        <SaveIcon />
      </StyledIconButton>
      <StyledIconButton
        color='primary'
        aria-label='edit'
        type='button'
        onClick={() => setIsEditEnabled(!isEditEnabled)}
      >
        <EditIcon />
      </StyledIconButton>
    </StyledPaper>
  )
}
