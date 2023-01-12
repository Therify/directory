import { Control } from 'react-hook-form';
import { styled, Box, Link } from '@mui/material';
import { H1, LoadingContainer, Subhead, Paragraph, H3 } from '@therify/ui/core';
import { RegisterProvider } from '@therify/features/accounts';
import { NumberOfSeatsInput } from './inputs/NumberOfSeats';

interface SeatCountFormProps {
    control: Control<{
        numberOfSeats: RegisterProvider.Input['numberOfSeats'];
    }>;
    defaultValue?: RegisterProvider.Input['numberOfSeats'];
    isLoading?: boolean;
    minimumSeats?: number;
    maximumSeats?: number;
    baseSeatPrice: number;
    numberOfSeats: number;
}

export const SeatCountForm = ({
    baseSeatPrice,
    numberOfSeats,
    control,
    defaultValue,
    minimumSeats = 1,
    maximumSeats = 15,
}: SeatCountFormProps) => {
    return (
        <Container>
            <Header>How many providers are at your practice?</Header>
            <Subhead textAlign="center">{numberOfSeats}</Subhead>
            <ProductsContainer>
                <Box display="flex" width="100%">
                    <Paragraph>{minimumSeats}</Paragraph>
                    <NumberOfSeatsInput
                        control={control}
                        defaultValue={defaultValue}
                        max={maximumSeats}
                        min={minimumSeats}
                    />
                    <Paragraph>{maximumSeats}</Paragraph>
                </Box>
            </ProductsContainer>
            <Paragraph>Your monthly cost:</Paragraph>
            <H3>${numberOfSeats * baseSeatPrice} / month</H3>

            {numberOfSeats === maximumSeats && (
                <Paragraph>
                    Need more than {maximumSeats} seats? <Link>Contact us</Link>{' '}
                    about our enterprise pricing.
                </Paragraph>
            )}
        </Container>
    );
};

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
}));

const Header = styled(H1)(({ theme }) => ({
    ...theme.typography.h3,
    marginBottom: theme.spacing(6),
    width: '75%',
}));

const ProductsContainer = styled(LoadingContainer)(({ theme }) => ({
    '& > * ': {
        marginRight: theme.spacing(4),
    },
}));
