import { Avatar, AVATAR_SIZE } from '@/components/ui/Avatar';
import { Divider } from '@/components/ui/Divider';
import { PageHeader } from '@/components/ui/PageHeader';
import { H2 } from '@/components/ui/Typography/Headers';
import {
    Paragraph,
    PARAGRAPH_SIZE,
} from '@/components/ui/Typography/Paragraph';
import {
    AutoFixHighOutlined,
    BadgeOutlined,
    ChairOutlined,
    PeopleOutlined,
    PublicOutlined,
    SchoolOutlined,
    TransgenderOutlined,
    TranslateOutlined,
    VideoCameraFrontOutlined,
} from '@mui/icons-material';
import { Box, Chip, Stack, Tab, Tabs, useMediaQuery } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { CriteriaCard, CRITERIA_CARD_TYPES } from './CriteriaCard';

interface ProviderProfileProps {
    profileImageUrl?: string | null;
    givenName?: string;
    surname?: string;
    pronouns?: string;
    state?: string;
    acceptedInsurances?: string[];
    specialties?: string[];
    bio?: string;
    offersInPerson?: boolean;
    offersVirtual?: boolean;
}

export function ProviderProfile({
    profileImageUrl = null,
    givenName = 'John',
    surname = 'Smith',
    pronouns = 'he/him',
    state = 'California',
    acceptedInsurances = ['Aetna', 'Blue Cross Blue Shield'],
    specialties = ['Counseling', 'Psychotherapy'],
    bio = `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
    offersInPerson = false,
    offersVirtual = false,
}: ProviderProfileProps) {
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const ELEMENT_DIMENSIONS = {
        headerHeight: isSmallScreen ? 121 : 222,
        avatar: isSmallScreen ? AVATAR_SIZE.HUGE : AVATAR_SIZE.XHUGE,
        contentMarginTop: isSmallScreen ? 0.75 : 0.5,
    };
    return (
        <ProfileContainer
            sx={{
                minHeight:
                    ELEMENT_DIMENSIONS.headerHeight +
                    ELEMENT_DIMENSIONS.avatar * 2.5,
                height: '100%',
                overflowY: 'auto',
            }}
        >
            <ProfileBanner>
                <PageHeader
                    type="abstract1"
                    title={''}
                    containerProps={{
                        sx: {
                            height: ELEMENT_DIMENSIONS.headerHeight,
                        },
                    }}
                />
                <Avatar
                    size={ELEMENT_DIMENSIONS.avatar}
                    src={profileImageUrl ?? undefined}
                    sx={{ position: 'absolute', top: '50%' }}
                />
            </ProfileBanner>
            <ProfileContent
                sx={{
                    marginTop:
                        ELEMENT_DIMENSIONS.avatar *
                        ELEMENT_DIMENSIONS.contentMarginTop,
                }}
            >
                <ProviderTitle spacing={-2}>
                    <ProviderNameContainer
                        direction={'row'}
                        alignItems="baseline"
                        spacing={2}
                    >
                        <ProviderName>
                            {givenName} {surname}
                        </ProviderName>
                        <Paragraph size="small">({pronouns})</Paragraph>
                    </ProviderNameContainer>
                    <ProviderCredentials>
                        <Paragraph>Licensed Professional Counselor</Paragraph>
                    </ProviderCredentials>
                    <ProviderState>
                        <Paragraph>Nashville, {state}</Paragraph>
                    </ProviderState>
                </ProviderTitle>
                <ProviderModalities>
                    {offersInPerson && (
                        <ModalityChip
                            label="In-person"
                            size="small"
                            icon={<ChairOutlined />}
                            variant="outlined"
                            color="primary"
                        />
                    )}
                    {offersVirtual && (
                        <ModalityChip
                            label="Virtual"
                            size="small"
                            icon={<VideoCameraFrontOutlined />}
                            variant="outlined"
                            color="primary"
                        />
                    )}
                </ProviderModalities>
                <ProviderVideo />
                <ProviderMatchCriteria>
                    <CriteriaCard
                        type={CRITERIA_CARD_TYPES.INSURANCE}
                        sx={{
                            minWidth: {
                                xs: 235,
                                md: 338,
                            },
                        }}
                        items={acceptedInsurances}
                    />
                    <CriteriaCard
                        type={CRITERIA_CARD_TYPES.SPECIALTIES}
                        sx={{
                            minWidth: {
                                xs: 235,
                                md: 338,
                            },
                        }}
                        items={specialties}
                    />
                </ProviderMatchCriteria>
                <ProviderDetails spacing={8}>
                    <Paragraph
                        size={PARAGRAPH_SIZE.LARGE}
                        sx={{ fontWeight: 'bold' }}
                    >
                        About Me
                    </Paragraph>
                    <Paragraph sx={{ whiteSpace: 'pre-line' }}>{bio}</Paragraph>
                    <Divider />
                    <Paragraph
                        size={PARAGRAPH_SIZE.LARGE}
                        sx={{ fontWeight: 'bold' }}
                    >
                        More about {givenName}
                    </Paragraph>
                    <ul>
                        <ProviderAttribute>
                            <SchoolOutlined />
                            <Paragraph>
                                Education: MA (Master of Arts) at Oakland
                                University
                            </Paragraph>
                        </ProviderAttribute>
                        <ProviderAttribute>
                            <BadgeOutlined />
                            <Paragraph>License type: LPC</Paragraph>
                        </ProviderAttribute>
                        <ProviderAttribute>
                            <TransgenderOutlined />
                            <Paragraph>Gender: Female</Paragraph>
                        </ProviderAttribute>
                        <ProviderAttribute>
                            <PublicOutlined />
                            <Paragraph>Ethnicity: Caucasian</Paragraph>
                        </ProviderAttribute>
                        <ProviderAttribute>
                            <TranslateOutlined />
                            <Paragraph>Languages: English</Paragraph>
                        </ProviderAttribute>
                        <ProviderAttribute>
                            <PeopleOutlined />
                            <Paragraph>
                                Works with: Adolescents, Adults, and Seniors
                            </Paragraph>
                        </ProviderAttribute>
                        <ProviderAttribute>
                            <AutoFixHighOutlined />
                            <Paragraph>
                                Specialties: {specialties.join(', ')}
                            </Paragraph>
                        </ProviderAttribute>
                    </ul>
                </ProviderDetails>
            </ProfileContent>
        </ProfileContainer>
    );
}

const ProfileContainer = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    overflowY: 'auto',
    background: 'white',
    padding: theme.spacing(4),
}));

const ProfileBanner = styled(Box)(({ theme }) => ({
    position: 'relative',
}));

const ProfileContent = styled(Box)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.lg,
    display: 'grid',
    gridAutoFlow: 'row',
    gridGap: theme.spacing(6),
}));

const ProviderTitle = styled(Stack)(({ theme }) => ({}));

const ProviderDetails = styled(Stack)(({ theme }) => ({}));

const ProviderDetailsHeader = styled(Box)(({ theme }) => ({}));

const ProviderNameContainer = styled(Stack)(({ theme }) => ({}));
const ProviderName = styled(H2)(({ theme }) => ({
    ...theme.typography.h3,
    [theme.breakpoints.up('md')]: {
        ...theme.typography.h2,
    },
}));

const ProviderCredentials = styled(Stack)(({ theme }) => ({}));

const ProviderModalities = styled(Box)(({ theme }) => ({}));

const ProviderState = styled(Box)(({ theme }) => ({}));

const ProviderVideo = styled(Box)(({ theme }) => ({}));

const ProviderMatchCriteria = styled(Box)(({ theme }) => ({
    overflowX: 'auto',
    maxWidth: '100%',
    display: 'flex',
    gridGap: theme.spacing(4),
}));

const ModalityChip = styled(Chip)(({ theme }) => ({
    borderRadius: 2,
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(1),
}));

const ProviderAttribute = styled('li')(({ theme }) => ({
    display: 'flex',
    [`& > *:first-child`]: {
        marginRight: theme.spacing(4),
    },
}));
