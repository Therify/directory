import { useEffect, useMemo } from 'react';
import { TwoColumnGrid } from '../../../ui/Grids/TwoColumnGrid';
import { useForm } from 'react-hook-form';
import { Language, Modality, AgeGroup, Gender } from '@/lib/types';
import { ProviderProfile as ProviderProfileUi } from '../../directory/ProviderProfile';
import { ProfileEditorForm } from './ui/ProfileEditorForm';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { Practice, ProfileType } from '@prisma/client';
import { CloudinaryUploadResult } from '../../media/hooks/userCloudinaryWidget';
import { styled, SxProps } from '@mui/material/styles';
import { Box } from '@mui/material';

interface CreateOrUpdateProfileProps {
    providerProfile?: Partial<ProviderProfile>;
    practice: Pick<Practice, 'id' | 'city' | 'state' | 'website'>;
    onBack?: () => void;
}

export function CreateOrUpdateProfile({
    providerProfile,
    practice,
    onBack,
}: CreateOrUpdateProfileProps) {
    const providerProfileForm = useForm<ProviderProfile>({
        mode: 'onChange',
        defaultValues: {
            gender: Gender.MAP.PREFER_NOT_TO_SAY,
            designation: ProfileType.therapist,
            minimumRate: 40,
            languagesSpoken: [Language.MAP.ENGLISH],
            modalities: [Modality.MAP.INDIVIDUALS],
            ageGroups: [AgeGroup.MAP.ADULTS],
            acceptedInsurances: [],
            credentials: [],
            ...providerProfile,
        },
    });
    const offersSlidingScale = providerProfileForm.watch('offersSlidingScale');
    const designation = providerProfileForm.watch('designation');
    const minimumRate = parseInt(
        providerProfileForm.watch('minimumRate')?.toString() ?? '0'
    );
    const givenName = providerProfileForm.watch('givenName');
    const surname = providerProfileForm.watch('surname');
    const pronouns = providerProfileForm.watch('pronouns');
    const specialties = providerProfileForm.watch('specialties');
    const bio = providerProfileForm.watch('bio');
    const offersInPerson = providerProfileForm.watch('offersInPerson');
    const offersVirtual = providerProfileForm.watch('offersVirtual');
    const profileImageUrl = providerProfileForm.watch('profileImageUrl');
    const ethnicity = providerProfileForm.watch('ethnicity');
    const credentials = providerProfileForm.watch('credentials');
    // TODO: move to util function
    const acceptedInsurances = Array.from(
        new Set(
            (providerProfileForm.watch('acceptedInsurances') ?? []).flatMap(
                ({ insurances }) => insurances
            )
        )
    ).sort();

    const licensedStates = useMemo(() => {
        return Array.from(
            new Set((credentials ?? []).map(({ state }) => state))
        );
    }, [credentials]);

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
                        profile={providerProfileForm.getValues()}
                        control={providerProfileForm.control}
                        onImageUploadSuccess={onImageUploadSuccess}
                        onImageUploadError={onImageUploadError}
                        licensedStates={licensedStates}
                        onSubmitForm={async () => {}}
                        isFormValid={providerProfileForm.formState.isValid}
                        isSubmittingForm={false}
                        onBack={onBack}
                    />
                </SlotWrapper>
            }
            rightSlot={
                <SlotWrapper>
                    <ProviderProfileUi
                        designation={providerProfileForm.watch('designation')}
                        profileImageUrl={profileImageUrl}
                        givenName={givenName}
                        surname={surname}
                        pronouns={pronouns}
                        cityState={`${practice.city}, ${practice.state}`}
                        acceptedInsurances={acceptedInsurances}
                        specialties={specialties}
                        bio={bio}
                        offersInPerson={offersInPerson}
                        offersVirtual={offersVirtual}
                        ethnicity={ethnicity}
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
