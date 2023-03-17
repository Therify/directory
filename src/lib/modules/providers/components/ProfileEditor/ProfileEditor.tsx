import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NewClientStatus, Practice, ProfileType } from '@prisma/client';
import { styled, SxProps, useTheme } from '@mui/material/styles';
import { Box, CircularProgress, Drawer, useMediaQuery } from '@mui/material';
import {
    Button,
    H3,
    LoadingContainer,
    Modal,
    TwoColumnGrid,
} from '@/lib/shared/components/ui';
import {
    Language,
    Modality,
    AgeGroup,
    ProviderProfile,
    ProviderPractice,
    Region,
    AcceptedInsurance,
} from '@/lib/shared/types';
import { Alerts } from '@/lib/modules/alerts/context';
import { ProfileEditorForm } from './ui/ProfileEditorForm';
import { ProviderProfile as ProviderProfileUi } from '../../../directory/components/ProviderProfile';
import { CloudinaryUploadResult } from '../../../media/components/hooks/userCloudinaryWidget';

interface ProfileEditorProps {
    providerProfile?: Partial<ProviderProfile.ProviderProfile>;
    practice: ProviderPractice.Type;
    isSavingProfile: boolean;
    onBack?: () => void;
    onSubmit: (profile: ProviderProfile.ProviderProfile) => Promise<void>;
}

export function ProfileEditor({
    providerProfile,
    practice,
    isSavingProfile,
    onBack,
    onSubmit,
}: ProfileEditorProps) {
    const providerProfileForm = useForm<ProviderProfile.ProviderProfile>({
        mode: 'onChange',
        defaultValues: {
            newClientStatus:
                providerProfile?.newClientStatus ?? NewClientStatus.accepting,
            offersInPerson: false,
            offersMedicationManagement: false,
            offersPhoneConsultations: false,
            offersVirtual: true,
            offersSlidingScale: false,
            offersChat: false,
            specialties: [],
            ethnicity: [],
            religions: [],
            evidenceBasedPractices: [],
            communitiesServed: [],
            modalities: [Modality.MAP.INDIVIDUALS],
            languagesSpoken: [Language.MAP.ENGLISH],
            ageGroups: [AgeGroup.MAP.ADULTS],
            minimumRate: 40,
            designation: ProfileType.therapist,
            acceptedInsurances: [],
            credentials: [],
            yearsOfExperience: '',
            ...providerProfile,
        },
    });
    const theme = useTheme();
    const { createAlert } = useContext(Alerts.Context);
    const [showProfilePreview, setShowProfilePreview] = useState(false);
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
    const watchedProfile = providerProfileForm.watch();
    const licensedStates = useMemo(() => {
        return Array.from(
            new Set(
                (watchedProfile.credentials ?? []).map(
                    (credential) => `${credential.state},${credential.country}`
                )
            )
        ).map((uniqueState) => {
            const [state, country] = uniqueState.split(',');
            return Region.stateAndCountrySchema.parse({ state, country });
        });
    }, [watchedProfile.credentials]);

    useEffect(
        function manageAcceptedInsuranceStates() {
            const acceptedInsurances = (
                providerProfileForm.getValues('acceptedInsurances') ?? []
            ).filter(
                (insurance) =>
                    licensedStates.find(
                        (licensedState) =>
                            licensedState.state === insurance.state &&
                            licensedState.country === insurance.country
                    ) !== undefined
            );
            licensedStates.forEach(({ state, country }) => {
                const stateIsFound =
                    acceptedInsurances.find(
                        (insurance) =>
                            insurance.state === state &&
                            insurance.country === country
                    ) !== undefined;
                if (!stateIsFound) {
                    acceptedInsurances.push(
                        AcceptedInsurance.validate({
                            state,
                            country,
                            insurances: [],
                        })
                    );
                }
                providerProfileForm.setValue(
                    'acceptedInsurances',
                    acceptedInsurances
                );
            });
        },
        [licensedStates, providerProfileForm]
    );

    useEffect(
        function manageSlidingScaleRates() {
            const minimumRate = providerProfileForm.getValues('minimumRate');
            if (watchedProfile.offersSlidingScale) {
                providerProfileForm.setValue('maximumRate', minimumRate + 40);
            } else {
                providerProfileForm.setValue('maximumRate', null);
            }
        },
        [watchedProfile.offersSlidingScale, providerProfileForm]
    );

    useEffect(
        function setCoachDefaults() {
            if (watchedProfile.designation === ProfileType.coach) {
                providerProfileForm.setValue(
                    'offersMedicationManagement',
                    false
                );
                providerProfileForm.setValue('acceptedInsurances', []);
                providerProfileForm.setValue('supervisor', null);
            }
        },
        [providerProfileForm, watchedProfile.designation]
    );

    const onDeleteImage = () => {
        providerProfileForm.setValue('profileImageUrl', null);
    };
    const onImageUploadError = (error: Error | string) => {
        createAlert({
            type: 'error',
            title: 'There was an error uploading your image.',
        });
        console.error(error);
        return;
    };
    const onImageUploadSuccess = (
        error: Error | null,
        result: CloudinaryUploadResult
    ) => {
        if (error) {
            onImageUploadError(error);
            return;
        }
        providerProfileForm.setValue('profileImageUrl', result.info.secure_url);
    };

    return (
        <>
            <TwoColumnGrid
                fillSpace
                leftSlotSx={{ ...SLOT_STYLES, position: 'relative' }}
                rightSlotSx={{ ...SLOT_STYLES, ...HIDDEN_ON_MOBILE }}
                leftSlot={
                    <>
                        <SlotWrapper>
                            <ProfileEditorForm
                                control={providerProfileForm.control}
                                onDeleteImage={onDeleteImage}
                                onImageUploadSuccess={onImageUploadSuccess}
                                onImageUploadError={onImageUploadError}
                                licensedStates={licensedStates}
                                onSubmitForm={() => {
                                    onSubmit(providerProfileForm.getValues());
                                }}
                                isSubmitDisabled={
                                    !providerProfileForm.formState.isValid ||
                                    providerProfileForm.formState
                                        .isSubmitting ||
                                    !providerProfileForm.formState.isDirty
                                }
                                isSubmittingForm={isSavingProfile}
                                onBack={onBack}
                                onShowProfilePreview={() => {
                                    setShowProfilePreview(true);
                                }}
                                setSupervisor={(supervisor) =>
                                    providerProfileForm.setValue(
                                        'supervisor',
                                        supervisor
                                    )
                                }
                                watchedProfileValues={{
                                    id: watchedProfile.id,
                                    designation: watchedProfile.designation,
                                    givenName: watchedProfile.givenName,
                                    surname: watchedProfile.surname,
                                    profileImageUrl:
                                        watchedProfile.profileImageUrl,
                                    offersSlidingScale:
                                        watchedProfile.offersSlidingScale,
                                    offersChat: watchedProfile.offersChat,
                                    minimumRate: watchedProfile.minimumRate,
                                    supervisor: watchedProfile.supervisor,
                                }}
                            />
                        </SlotWrapper>
                        {isMobileView && (
                            <PreviewDrawer
                                open={showProfilePreview}
                                anchor="top"
                                onClose={() => setShowProfilePreview(false)}
                            >
                                <ProviderProfileUi
                                    practice={practice}
                                    {...watchedProfile}
                                    bio={
                                        watchedProfile.bio ||
                                        'Tell us about yourself.'
                                    }
                                />
                                <FloatingButton
                                    color="secondary"
                                    onClick={() => setShowProfilePreview(false)}
                                >
                                    Close
                                </FloatingButton>
                            </PreviewDrawer>
                        )}
                    </>
                }
                rightSlot={
                    <SlotWrapper>
                        {!isMobileView && (
                            <ProviderProfileUi
                                practice={practice}
                                {...watchedProfile}
                                bio={
                                    watchedProfile.bio ||
                                    'Tell us about yourself.'
                                }
                            />
                        )}
                    </SlotWrapper>
                }
            />
            <Modal
                isOpen={isSavingProfile}
                showCloseButton={false}
                onClose={() => {}}
                headerSlot={
                    <H3 textAlign="center" width="100%">
                        {watchedProfile.id
                            ? `Updating ${
                                  watchedProfile.givenName || 'Provider'
                              }'s Profile`
                            : `Creating ${
                                  watchedProfile.givenName || 'Provider'
                              }'s Profile`}
                    </H3>
                }
                postBodySlot={
                    <LoadingContainer isLoading>
                        <CircularProgress />
                    </LoadingContainer>
                }
            />
        </>
    );
}
const SCROLLBAR_STYLE: SxProps = {
    // Hides the scrollbar but keeps scroll functionality
    msOverflowStyle: 'none' /* IE and Edge */,
    scrollbarWidth: 'none',
    '& > div::-webkit-scrollbar': {
        display: 'none',
    },
};

const HIDDEN_ON_MOBILE = {
    display: { xs: 'none', md: 'inherit' },
};
const SLOT_STYLES = {
    display: 'flex',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
};
const SlotWrapper = styled(Box)(() => ({
    height: '100%',
    width: '100%',
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'auto',
    ...SCROLLBAR_STYLE,
}));

const PreviewDrawer = styled(Drawer)(({ theme }) => ({
    height: '100%',
    width: '100%',
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
    ...SCROLLBAR_STYLE,
    '& .MuiPaper-root': {
        height: '100%',
        paddingBottom: theme.spacing(6),
        '& > .MuiBox-root': {
            margin: 0,
        },
    },
}));

const FloatingButton = styled(Button, {
    shouldForwardProp: (prop) => 'showButton' !== prop,
})(({ theme }) => ({
    position: 'absolute',
    padding: theme.spacing(2),
    zIndex: 2,
    minWidth: `25%`,
    maxWidth: `calc(100% - ${theme.spacing(6)})`,
    bottom: theme.spacing(3),
    right: theme.spacing(3),
}));
