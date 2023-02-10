import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { colors } from '../../../themes/therify-design-system';
import { H2 } from '../../Typography';
import { HeaderContainer } from '../../Containers/HeaderContainer';

interface WithHeaderProps {
    title: string;
    icon?: React.ReactNode;
    type: 'primary' | 'secondary';
    children: React.ReactNode;
}

function renderIcon({ icon, type }: WithHeaderProps) {
    if (!icon) {
        return null;
    }
    return (
        <Avatar
            sx={{
                marginRight: 4,
                backgroundColor:
                    type === 'primary'
                        ? colors.primary[500]
                        : colors.secondary.blue[500],
            }}
        >
            {icon}
        </Avatar>
    );
}

export function WithHeader(props: WithHeaderProps) {
    return (
        <Container maxWidth={'xl'}>
            <HeaderContainer type={props.type} sx={{ mb: 2, mt: 8 }}>
                <Box display={'flex'}>
                    {renderIcon(props)}
                    <H2>{props.title}</H2>
                </Box>
            </HeaderContainer>
            <Box p={4}>{props.children}</Box>
        </Container>
    );
}
