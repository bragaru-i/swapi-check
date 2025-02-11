import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Typography, Box } from '@mui/material'
import { useGetCharacterById } from '@/api/swapi'
import { InputCell } from './input-cell'
import { CenteredCircularProgress } from '@/components/centered-circular-progress'


export const CharacterPage: React.FC = () => {
    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { isLoading, data, isError } = useGetCharacterById(id!)

    if (isLoading) {
        return <CenteredCircularProgress> Fetching List </CenteredCircularProgress>
    }

    if (isError) {
        return (
            <Typography
                variant='h5'
                gutterBottom
                textAlign='center'
                alignItems='center'
                marginTop='6rem'
            >
                Error fetching character {id}
            </Typography>
        )
    }

    if (!data) {
        return (
            <Typography
                variant='h5'
                gutterBottom
                textAlign='center'
                alignItems='center'
                marginTop='6rem'
            >
                No character found with id {id}
            </Typography>
        )
    }

    return (
        <>
            <Typography
                variant='h5'
                gutterBottom
            >
                Preview character {id}
            </Typography>
            <Box
                display='flex'
                flexDirection='column'
                gap={2}
            >
                <InputCell
                    label='Set a new name'
                    name='name'
                    fullWidth
                    description='Name:'
                    value={data.name}
                />

                <InputCell
                    label='Set new height'
                    name='height'
                    fullWidth
                    value={data.height}
                    description='Height:'
                    type="number"

                />
                <InputCell
                    label='Set new mass'
                    name='mass'
                    fullWidth
                    value={data.mass}
                    description='Mass:'
                    type="number"
                />

                <InputCell
                    label='Set new birth year'
                    name='birth_year'
                    fullWidth
                    value={data.birth_year}
                    description='Birth Year:'
                />
            </Box>
            <Box
                height='100%'
                flexGrow={1}
            />
            <Button
                variant='contained'
                color='primary'
                sx={{ alignSelf: "flex-start" }}
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
        </>
    )
}
