import {
    CenteredContainer,
    H1,
    Paragraph,
    Button,
    TherifyIcon,
} from '@/lib/shared/components/ui';
import { URL_PATHS } from '@/lib/sitemap';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
    const router = useRouter();
    return (
        <CenteredContainer fillSpace padding={6} textAlign="center">
            <TherifyIcon />
            <H1 marginTop={4}>404 - Page Not Found</H1>
            <Paragraph>
                Oh no! Looks like this page doesn&apos;t exist.
            </Paragraph>
            <Button onClick={() => router.push(URL_PATHS.ROOT)}>Go Home</Button>
        </CenteredContainer>
    );
}
