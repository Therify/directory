import { Avatar, AVATAR_SIZE } from '@/components/ui/Avatar';
import { Divider } from '@/components/ui/Divider';
import { PageHeader } from '@/components/ui/PageHeader';
import { H2 } from '@/components/ui/Typography/Headers';
import {
    Paragraph,
    PARAGRAPH_SIZE,
} from '@/components/ui/Typography/Paragraph';
import { ProviderProfile as ProviderProfileType } from '@/lib/types';
import {
    AutoFixHighOutlined,
    BadgeOutlined,
    ChairOutlined,
    MedicationOutlined,
    PeopleOutlined,
    PhoneOutlined,
    PublicOutlined,
    Man4Outlined,
    TranslateOutlined,
    VerifiedOutlined,
    VideoCameraFrontOutlined,
    Diversity1Outlined,
    ChurchOutlined,
    PersonPinCircleOutlined,
} from '@mui/icons-material';
import { Box, Chip, Link, Stack, useMediaQuery } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { Practice, ProfileType } from '@prisma/client';
import { getYear, intervalToDuration } from 'date-fns';
import { CalloutBanner } from './CalloutBanner';
import { CriteriaCard, CRITERIA_CARD_TYPES } from './CriteriaCard';

interface ProviderProfileProps {
    practice?: Pick<Practice, 'id' | 'name' | 'city' | 'state' | 'website'>;
    isFavorited?: boolean;
    isFavoriteLoading?: boolean;
    onFavorite?: () => Promise<void>;
    onShare?: () => void;
}

export function ProviderProfile({
    practice,
    onShare,
    onFavorite,
    isFavoriteLoading,
    isFavorited,
    designation,
    profileImageUrl = null,
    givenName = 'Your Name',
    surname,
    pronouns,
    bio = '',
    idealClientDescription,
    practiceNotes,
    offersInPerson = false,
    offersVirtual = false,
    gender,
    offersPhoneConsultations,
    offersMedicationManagement,
    practiceStartDate,
    specialties = [],
    acceptedInsurances = [],
    communitiesServed = [],
    religions = [],
    ethnicity = [],
    languagesSpoken = [],
    credentials = [],
    ageGroups = [],
}: ProviderProfileProps & ProviderProfileType.ProviderProfile) {
    const isTherapist = designation === ProfileType.therapist;
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const { years: yearsOfExperience } = intervalToDuration({
        start: practiceStartDate ?? new Date(),
        end: new Date(),
    });
    const credentialsList = Array.from(
        new Set(credentials.map(({ type }) => type))
    ).join(', ');
    const licensedStates = Array.from(
        new Set(credentials.map(({ state }) => state))
    ).join(', ');
    const ELEMENT_DIMENSIONS = {
        headerHeight: isSmallScreen ? 121 : 222,
        avatar: isSmallScreen ? AVATAR_SIZE.XHUGE : AVATAR_SIZE.XXHuge,
        contentMarginTop: 0.75,
    };
    const allAcceptedInsurances = Array.from(
        new Set(acceptedInsurances.flatMap(({ insurances }) => insurances))
    ).sort();

    // NOTES: Only thing not listed is the licensed states
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
                        {pronouns && (
                            <SecondaryText size="small">
                                ({pronouns})
                            </SecondaryText>
                        )}
                    </ProviderNameContainer>
                    <ProviderCredentials>
                        <Paragraph>
                            {designation === ProfileType.therapist
                                ? 'Therapist'
                                : 'Mental Health Coach'}
                            {practice && (
                                <>
                                    {'  '} at{'  '}
                                    {practice.website ? (
                                        <PracticeLink
                                            href={practice.website}
                                            target="_blank"
                                        >
                                            {practice.name}
                                        </PracticeLink>
                                    ) : (
                                        practice.name
                                    )}
                                </>
                            )}
                        </Paragraph>
                    </ProviderCredentials>
                    <ProviderState>
                        {credentials.length > 0 && (
                            <SecondaryText>
                                Licensed in {licensedStates}
                            </SecondaryText>
                        )}
                    </ProviderState>
                </ProviderTitle>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <SessionTypeContainer>
                        {offersInPerson && (
                            <SessionTypeChip
                                label="In-person"
                                size="small"
                                icon={<ChairOutlined />}
                                variant="outlined"
                                color="primary"
                            />
                        )}
                        {offersVirtual && (
                            <SessionTypeChip
                                label="Virtual"
                                size="small"
                                icon={<VideoCameraFrontOutlined />}
                                variant="outlined"
                                color="primary"
                            />
                        )}
                    </SessionTypeContainer>
                    <Box>
                        {/* TODO: Handle Share */}
                        {/* TODO: Handle Favorite */}
                    </Box>
                </Box>
                <ProviderVideo />
                <ProviderMatchCriteria>
                    {isTherapist && allAcceptedInsurances.length > 0 && (
                        <CriteriaCard
                            type={CRITERIA_CARD_TYPES.INSURANCE}
                            sx={{
                                minWidth: {
                                    xs: 235,
                                    md: 338,
                                },
                            }}
                            items={allAcceptedInsurances}
                        />
                    )}
                    {specialties.length > 0 && (
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
                    )}
                </ProviderMatchCriteria>
                <Box>
                    {practiceStartDate &&
                        yearsOfExperience !== undefined &&
                        yearsOfExperience > 0 && (
                            <CalloutBanner
                                icon={<VerifiedOutlined />}
                                title={`${
                                    yearsOfExperience > 10
                                        ? '10+'
                                        : yearsOfExperience
                                } ${
                                    yearsOfExperience === 1 ? 'year' : 'years'
                                } of experience`}
                                description={`${
                                    givenName || 'This provider'
                                } has been serving people like you since ${getYear(
                                    practiceStartDate
                                )}`}
                            />
                        )}
                    {offersInPerson && practice && (
                        <CalloutBanner
                            icon={<PersonPinCircleOutlined />}
                            title={`In-person sessions in ${practice.city}, ${practice.state}`}
                            description={`In-person sessions available at ${practice.name}`}
                        />
                    )}
                    {offersPhoneConsultations && (
                        <CalloutBanner
                            icon={<PhoneOutlined />}
                            title="Free intro phone consultations"
                            description={`${
                                givenName || 'This provider'
                            } offers a free 15 min phone consultation to get started`}
                        />
                    )}
                    {offersMedicationManagement && isTherapist && (
                        <CalloutBanner
                            icon={<MedicationOutlined />}
                            title="Offers medication management"
                            description="Licensed to prescribe medication in treatment"
                        />
                    )}
                </Box>

                <ProviderDetails spacing={8}>
                    <Paragraph bold noMargin size={PARAGRAPH_SIZE.LARGE}>
                        About Me
                    </Paragraph>
                    <AttributeText sx={{ whiteSpace: 'pre-line' }}>
                        {bio}
                    </AttributeText>
                    {practiceNotes && (
                        <>
                            <Paragraph noMargin bold>
                                My approach to{' '}
                                {isTherapist
                                    ? 'therapy'
                                    : 'mental health coaching'}
                            </Paragraph>
                            <AttributeText sx={{ whiteSpace: 'pre-line' }}>
                                {practiceNotes}
                            </AttributeText>
                        </>
                    )}
                    {idealClientDescription && (
                        <>
                            <Paragraph noMargin bold>
                                My ideal client
                            </Paragraph>
                            <AttributeText sx={{ whiteSpace: 'pre-line' }}>
                                {idealClientDescription}
                            </AttributeText>
                        </>
                    )}
                    <Divider />
                    <Paragraph
                        size={PARAGRAPH_SIZE.LARGE}
                        sx={{ fontWeight: 'bold' }}
                    >
                        More about {givenName}
                    </Paragraph>
                    <ul>
                        {/* Todo! We don't currently capture this information */}
                        {/* <ProviderAttribute>
                            <SchoolOutlined />
                            <Paragraph>
                                Education: MA (Master of Arts) at Oakland
                                University
                            </Paragraph>
                        </ProviderAttribute> */}
                        {credentials.length > 0 && (
                            <ProviderAttribute>
                                <BadgeOutlined />
                                <AttributeText>
                                    License{' '}
                                    {credentials.length === 1
                                        ? 'type'
                                        : 'types'}
                                    : {credentialsList}
                                </AttributeText>
                            </ProviderAttribute>
                        )}
                        {gender && (
                            <ProviderAttribute>
                                <Man4Outlined />
                                <AttributeText>Gender: {gender}</AttributeText>
                            </ProviderAttribute>
                        )}
                        {ethnicity.length > 0 && (
                            <ProviderAttribute>
                                <PublicOutlined />
                                <AttributeText>
                                    Ethnicity: {ethnicity.join(', ')}
                                </AttributeText>
                            </ProviderAttribute>
                        )}
                        <ProviderAttribute>
                            <TranslateOutlined />
                            <AttributeText>
                                Speaks: {languagesSpoken.join(', ')}
                            </AttributeText>
                        </ProviderAttribute>
                        {ageGroups.length > 0 && (
                            <ProviderAttribute>
                                <PeopleOutlined />
                                <AttributeText>
                                    Works with: {ageGroups.join(', ')}
                                </AttributeText>
                            </ProviderAttribute>
                        )}
                        {communitiesServed.length > 0 && (
                            <ProviderAttribute>
                                <Diversity1Outlined />
                                <AttributeText>
                                    Serves Communities:{' '}
                                    {communitiesServed.join(', ')}
                                </AttributeText>
                            </ProviderAttribute>
                        )}
                        {religions.length > 0 && (
                            <ProviderAttribute>
                                <ChurchOutlined />
                                <AttributeText>
                                    Faith-based service: {religions.join(', ')}
                                </AttributeText>
                            </ProviderAttribute>
                        )}
                        {specialties.length > 0 && (
                            <ProviderAttribute>
                                <AutoFixHighOutlined />
                                <AttributeText>
                                    Specialties: {specialties.join(', ')}
                                </AttributeText>
                            </ProviderAttribute>
                        )}
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

const SecondaryText = styled(Paragraph)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const PracticeLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecorationColor: theme.palette.grey[200],
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

const SessionTypeContainer = styled(Box)(({ theme }) => ({}));

const ProviderState = styled(Box)(({ theme }) => ({}));

const ProviderVideo = styled(Box)(({ theme }) => ({}));

const ProviderMatchCriteria = styled(Box)(({ theme }) => ({
    overflowX: 'auto',
    maxWidth: '100%',
    display: 'flex',
    gridGap: theme.spacing(4),
}));

const SessionTypeChip = styled(Chip)(({ theme }) => ({
    borderRadius: 4,
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(2),
}));

const ProviderAttribute = styled('li')(({ theme }) => ({
    display: 'flex',
    [`& > *:first-of-type`]: {
        marginRight: theme.spacing(4),
    },
}));

const AttributeText = styled(Paragraph)(({ theme }) => ({
    maxWidth: '65ch',
}));
