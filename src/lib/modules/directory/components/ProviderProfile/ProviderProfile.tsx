import { FormValidation } from '@/lib/shared/components/ui';
import { Avatar, AVATAR_SIZE } from '@/lib/shared/components/ui/Avatar';
import { Divider } from '@/lib/shared/components/ui/Divider';
import { PageHeader } from '@/lib/shared/components/ui/PageHeader';
import { H2 } from '@/lib/shared/components/ui/Typography/Headers';
import {
    Paragraph,
    PARAGRAPH_SIZE,
} from '@/lib/shared/components/ui/Typography/Paragraph';
import {
    ProviderPractice,
    ProviderProfile as ProviderProfileType,
} from '@/lib/shared/types';
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
    QuestionAnswerOutlined,
} from '@mui/icons-material';
import {
    Box,
    Chip,
    Icon,
    IconProps,
    Link,
    Stack,
    useMediaQuery,
} from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { ProfileType } from '@prisma/client';
import { getYear, intervalToDuration } from 'date-fns';
import { ConnectionWidget } from '../ConnectionWidget/ConnectionWidget';
import { CalloutBanner } from './CalloutBanner';
import { CriteriaCard, CRITERIA_CARD_TYPES } from './CriteriaCard';
import Lottie from 'react-lottie';
import ANIMATION_DATA from '../DirectoryCard/favoriteAnimation.json';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import React from 'react';
interface ProviderProfileProps {
    practice?: ProviderPractice.Type;
    isFavorited?: boolean;
    isFavoriteLoading?: boolean;
    member?: Record<string, unknown>;
    providerHasBeenSelected?: boolean;
    onFavorite?: (callback: (isFavorite: boolean) => void) => () => void;
    onShare?: () => void;
    onConnectionRequest?: () => void;
}

const DEFAULT_ANIMATION_OPTIONS = {
    loop: false,
    animationData: ANIMATION_DATA,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        overflow: 'visible',
    },
};

interface RenderFavoriteAnimationProps {
    isStopped: boolean;
    isPaused: boolean;
    callback: () => void;
}
function renderFavoriteAnimation({
    isStopped,
    isPaused,
    callback,
}: RenderFavoriteAnimationProps) {
    return (
        <Lottie
            options={DEFAULT_ANIMATION_OPTIONS}
            isStopped={isStopped}
            isPaused={isPaused}
            eventListeners={[
                {
                    eventName: 'complete',
                    callback,
                },
            ]}
        />
    );
}

interface RenderFavoriteIconProps {
    isFavorite: boolean;
    isStopped: boolean;
    isPaused: boolean;
    callback: () => void;
    isAnimating: boolean;
}

function renderFavoriteIcon({
    isFavorite,
    isPaused,
    isStopped,
    callback,
    isAnimating,
}: RenderFavoriteIconProps) {
    if (isAnimating) {
        return renderFavoriteAnimation({
            isStopped,
            isPaused,
            callback,
        });
    }
    if (isFavorite) {
        return <Favorite />;
    }
    return <FavoriteBorder />;
}

export function ProviderProfile({
    practice,
    onShare,
    onFavorite,
    providerHasBeenSelected = false,
    member = undefined,
    isFavoriteLoading,
    isFavorited = false,
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
    offersChat,
    newClientStatus,
    practiceStartDate,
    specialties = [],
    acceptedInsurances = [],
    communitiesServed = [],
    religions = [],
    ethnicity = [],
    languagesSpoken = [],
    credentials = [],
    ageGroups = [],
    onConnectionRequest,
}: ProviderProfileProps & ProviderProfileType.ProviderProfile) {
    const [isProviderFavorite, setIsProviderFavorite] =
        React.useState(isFavorited);
    const [isStopped, setIsStopped] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const isTherapist = designation === ProfileType.therapist;
    // TODO: Remove `isTherifyTherapist` once we have distributed therapist profiles after launch.
    //This is a temporary fix to prevent showing "Therify"
    // as a practice for therapist profiles that are still in the process
    // of being migrated to their respective practices.
    const isTherifyTherapist =
        isTherapist && practice?.name.toLowerCase().includes('therify');
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    let yearsOfExperience = 0;
    if (practiceStartDate) {
        const { years } = intervalToDuration({
            start: FormValidation.validateDateIsValid(practiceStartDate)
                ? new Date(practiceStartDate)
                : new Date(),
            end: new Date(),
        });
        yearsOfExperience = years ?? 0;
    }

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

    return (
        <ScrollBox>
            <ProfileContainer
                sx={{
                    minHeight:
                        ELEMENT_DIMENSIONS.headerHeight +
                        ELEMENT_DIMENSIONS.avatar * 2.5,
                    paddingBottom: 30,
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
                <ProfileWrapper>
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
                                    {practice && !isTherifyTherapist && (
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
                                {credentials.length > 0 && isTherapist && (
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
                                {offersChat && (
                                    <SessionTypeChip
                                        label="In-App Messaging"
                                        size="small"
                                        icon={<QuestionAnswerOutlined />}
                                        variant="outlined"
                                        color="primary"
                                    />
                                )}
                            </SessionTypeContainer>
                            <Box>
                                {/* TODO: Handle Share */}
                                {onFavorite && (
                                    <Box>
                                        <CardIcon
                                            title={`Add ${givenName} to your favorite providers`}
                                            isFavorite={isProviderFavorite}
                                            onClick={onFavorite(
                                                (isNowFavorited: boolean) => {
                                                    if (isNowFavorited) {
                                                        setIsProviderFavorite(
                                                            true
                                                        );
                                                        setIsStopped(false);
                                                        setIsPaused(false);
                                                        setIsAnimating(true);
                                                    }
                                                    setIsProviderFavorite(
                                                        isNowFavorited
                                                    );
                                                }
                                            )}
                                        >
                                            {renderFavoriteIcon({
                                                isFavorite: isProviderFavorite,
                                                isStopped,
                                                isPaused,
                                                isAnimating,
                                                callback: () => {
                                                    console.log('complete');
                                                    setIsAnimating(false);
                                                    setIsStopped(true);
                                                    setIsPaused(true);
                                                },
                                            })}
                                        </CardIcon>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        <ProviderVideo />
                        <ProviderMatchCriteria>
                            {isTherapist &&
                                allAcceptedInsurances.length > 0 && (
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
                                            yearsOfExperience === 1
                                                ? 'year'
                                                : 'years'
                                        } of experience`}
                                        description={`${
                                            givenName || 'This provider'
                                        } has been serving people like you since ${getYear(
                                            new Date(practiceStartDate)
                                        )}`}
                                    />
                                )}
                            {offersInPerson &&
                                practice &&
                                !isTherifyTherapist && (
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
                            {offersChat && (
                                <CalloutBanner
                                    icon={<QuestionAnswerOutlined />}
                                    title="Offers in-app messaging"
                                    description={`${
                                        givenName || 'This provider'
                                    } can be reached by clients via in-app chat`}
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
                            <Paragraph
                                bold
                                noMargin
                                size={PARAGRAPH_SIZE.LARGE}
                            >
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
                                    <AttributeText
                                        sx={{ whiteSpace: 'pre-line' }}
                                    >
                                        {practiceNotes}
                                    </AttributeText>
                                </>
                            )}
                            {idealClientDescription && (
                                <>
                                    <Paragraph noMargin bold>
                                        My ideal client
                                    </Paragraph>
                                    <AttributeText
                                        sx={{ whiteSpace: 'pre-line' }}
                                    >
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
                                        <AttributeText>
                                            Gender: {gender}
                                        </AttributeText>
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
                                            Faith-based service:{' '}
                                            {religions.join(', ')}
                                        </AttributeText>
                                    </ProviderAttribute>
                                )}
                                {specialties.length > 0 && (
                                    <ProviderAttribute>
                                        <AutoFixHighOutlined />
                                        <AttributeText>
                                            Specialties:{' '}
                                            {specialties.join(', ')}
                                        </AttributeText>
                                    </ProviderAttribute>
                                )}
                            </ul>
                        </ProviderDetails>
                    </ProfileContent>
                    {member && (
                        <Box
                            sx={{
                                padding: {
                                    sm: 0,
                                    md: 4,
                                },
                                display: {
                                    sm: 'none',
                                    md: 'block',
                                },
                                paddingTop: {
                                    sm: 0,
                                    md: ELEMENT_DIMENSIONS.avatar / 2,
                                },
                            }}
                        >
                            <ConnectionWidget
                                newClientStatus={newClientStatus}
                                providerName={givenName}
                                onProviderSelected={onConnectionRequest}
                                providerHasBeenSelected={
                                    providerHasBeenSelected
                                }
                            />
                        </Box>
                    )}
                </ProfileWrapper>
            </ProfileContainer>
        </ScrollBox>
    );
}
const ScrollBox = styled(Box)(({ theme }) => ({
    overflowY: 'auto',
    height: '100%',
    width: '100%',
}));
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

const ProfileWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
}));

const ProfileContent = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridAutoFlow: 'row',
    gridGap: theme.spacing(6),
    width: '100%',
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

interface CardIconProps extends IconProps {
    isFavorite?: boolean;
}

const CardIcon = styled(Icon, {
    shouldForwardProp: (prop) => prop !== 'isFavorite',
})<CardIconProps>(({ theme, isFavorite }) => ({
    transition: 'transform 0.2s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    color: isFavorite ? theme.palette.error.main : theme.palette.grey[500],
    '&:hover': {
        transform: 'scale(1.1)',
        cursor: 'pointer',
    },
    '& > div[aria-label="animation"]': {
        overflow: 'visible !important',
        '& > svg': {
            overflow: 'visible !important',
            width: '75px !important',
            height: '75px !important',
            position: 'relative',
            top: '-25px',
        },
    },
}));
