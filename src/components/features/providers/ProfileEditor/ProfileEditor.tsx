import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Practice, ProfileType } from '@prisma/client';
import { styled, SxProps, useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { Button, TwoColumnGrid } from '@/components/ui';
import { Language, Modality, AgeGroup, ProviderProfile } from '@/lib/types';
import { ProfileEditorForm } from './ui/ProfileEditorForm';
import { ProviderProfile as ProviderProfileUi } from '../../directory/ProviderProfile';
import { CloudinaryUploadResult } from '../../media/hooks/userCloudinaryWidget';

interface ProfileEditorProps {
    providerProfile?: Partial<ProviderProfile.ProviderProfile>;
    practice: Pick<Practice, 'id' | 'name' | 'city' | 'state' | 'website'>;
    onBack?: () => void;
    onSubmit: (profile: ProviderProfile.ProviderProfile) => Promise<void>;
}

export function ProfileEditor({
    providerProfile,
    practice,
    onBack,
    onSubmit,
}: ProfileEditorProps) {
    const providerProfileForm = useForm<ProviderProfile.ProviderProfile>({
        mode: 'onChange',
        defaultValues: {
            offersInPerson: false,
            offersMedicationManagement: false,
            offersPhoneConsultations: false,
            offersVirtual: true,
            offersSlidingScale: false,
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
    const [showProfilePreview, setShowProfilePreview] = useState(false);
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
    const watchedProfile = providerProfileForm.watch();
    const licensedStates = useMemo(() => {
        return Array.from(
            new Set(
                (watchedProfile.credentials ?? []).map(({ state }) => state)
            )
        );
    }, [watchedProfile.credentials]);

    useEffect(() => {
        const acceptedInsurances = (
            providerProfileForm.getValues('acceptedInsurances') ?? []
        ).filter((insurance) => licensedStates.includes(insurance.state));
        licensedStates.forEach((state) => {
            const stateIsFound =
                acceptedInsurances.find(({ state: s }) => s === state) !==
                undefined;
            if (!stateIsFound) {
                acceptedInsurances.push({ state, insurances: [] });
            }
            providerProfileForm.setValue(
                'acceptedInsurances',
                acceptedInsurances
            );
        });
    }, [licensedStates, providerProfileForm]);

    useEffect(() => {
        const minimumRate = parseInt(
            providerProfileForm.getValues('minimumRate')?.toString() ?? '0'
        );
        if (watchedProfile.offersSlidingScale) {
            providerProfileForm.setValue('maximumRate', minimumRate + 40);
        } else {
            providerProfileForm.setValue('maximumRate', minimumRate);
        }
    }, [watchedProfile.offersSlidingScale, providerProfileForm]);

    useEffect(() => {
        if (watchedProfile.designation === ProfileType.coach) {
            providerProfileForm.setValue('offersMedicationManagement', false);
        }
    }, [providerProfileForm, watchedProfile.designation]);

    const onDeleteImage = () => {
        providerProfileForm.setValue('profileImageUrl', null);
    };
    const onImageUploadError = (error: Error | string) => {
        // TODO: handle error
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
                            isFormValid={providerProfileForm.formState.isValid}
                            isSubmittingForm={false}
                            onBack={onBack}
                            onShowProfilePreview={() => {
                                console.log('show profile preview');
                                setShowProfilePreview(true);
                            }}
                            watchedProfileValues={{
                                id: watchedProfile.id,
                                designation: watchedProfile.designation,
                                givenName: watchedProfile.givenName,
                                profileImageUrl: watchedProfile.profileImageUrl,
                                offersSlidingScale:
                                    watchedProfile.offersSlidingScale,
                                minimumRate: watchedProfile.minimumRate,
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
                                watchedProfile.bio || 'Tell us about yourself.'
                            }
                        />
                    )}
                </SlotWrapper>
            }
        />
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
