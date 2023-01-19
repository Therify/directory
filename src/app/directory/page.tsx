'use client';
import {
    DirectoryCard,
    MockDirectoryCardProps,
} from '@/components/features/directory/DirectoryCard';
import { ProviderSearchControls } from '@/components/features/directory/ProviderSearchControls';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

export default function Directory() {
    const router = useRouter();
    return (
        <DirectoryContainer>
            <ProviderSearchControls />
            <ProviderResultGrid>
                {Array.from({ length: 10 }).map((_, i) => (
                    <DirectoryCard
                        key={i}
                        onClick={() => {
                            router.push(`/directory/${i}`);
                        }}
                        {...MockDirectoryCardProps}
                    />
                ))}
            </ProviderResultGrid>
        </DirectoryContainer>
    );
}

const DirectoryContainer = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    padding: theme.spacing(4),
    height: '100%',
    overflowY: 'auto',
}));

const ProviderResultGrid = styled(Box)(({ theme }) => ({
    margin: theme.spacing(4, 0),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridGap: theme.spacing(4),
}));
