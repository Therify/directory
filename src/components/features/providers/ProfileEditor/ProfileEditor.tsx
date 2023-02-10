import { useEffect, useMemo } from 'react';
import { TwoColumnGrid } from '../../../ui/Grids/TwoColumnGrid';
import { useForm } from 'react-hook-form';
import { Language, Modality, AgeGroup, ProviderProfile } from '@/lib/types';
import { ProviderProfile as ProviderProfileUi } from '../../directory/ProviderProfile';
import { ProfileEditorForm } from './ui/ProfileEditorForm';
import { Practice, ProfileType } from '@prisma/client';
import { CloudinaryUploadResult } from '../../media/hooks/userCloudinaryWidget';
import { styled, SxProps } from '@mui/material/styles';
import { Box } from '@mui/material';

interface ProfileEditorProps {
    providerProfile?: Partial<ProviderProfile.ProviderProfile>;
    practice: Pick<Practice, 'id' | 'city' | 'state' | 'website'>;
    onBack?: () => void;
    onSubmit?: (profile: ProviderProfile.ProviderProfile) => void;
}

export function ProfileEditor({
    providerProfile,
    practice,
    onBack,
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
            rightSlotSx={SLOT_STYLES}
            leftSlot={
                <SlotWrapper>
                    <ProfileEditorForm
                        control={providerProfileForm.control}
                        onDeleteImage={onDeleteImage}
                        onImageUploadSuccess={onImageUploadSuccess}
                        onImageUploadError={onImageUploadError}
                        licensedStates={licensedStates}
                        onSubmitForm={async () => {}}
                        isFormValid={providerProfileForm.formState.isValid}
                        isSubmittingForm={false}
                        onBack={onBack}
                        watchedProfileValues={{
                            id: watchedProfile.id,
                            designation: watchedProfile.designation,
                            profileImageUrl: watchedProfile.profileImageUrl,
                            offersSlidingScale:
                                watchedProfile.offersSlidingScale,
                            minimumRate: watchedProfile.minimumRate,
                        }}
                    />
                </SlotWrapper>
            }
            rightSlot={
                <SlotWrapper>
                    <ProviderProfileUi
                        cityState={`${practice.city}, ${practice.state}`}
                        {...{
                            ...watchedProfile,
                            bio:
                                watchedProfile.bio || 'Tell us about yourself.',
                        }}
                    />
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
