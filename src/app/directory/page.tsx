'use client';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export default function Directory() {
    return <Container>Cool</Container>;
}

const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
