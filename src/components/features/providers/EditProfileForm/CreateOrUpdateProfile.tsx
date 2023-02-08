import { TwoColumnGrid } from '../../../ui/Grids/TwoColumnGrid';
import { useForm } from 'react-hook-form';
import { Language, Modality, AgeGroup, Gender } from '@/lib/types';
import { useEffect, useState } from 'react';
import { ProviderProfile as ProviderProfileUi } from '../../directory/ProviderProfile';
import { ProfileEditorForm } from './ui/ProfileEditorForm';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { ProfileType } from '@prisma/client';
import { CloudinaryUploadResult } from '../../media/hooks/userCloudinaryWidget';

interface CreateOrUpdateProfileProps {
    providerProfile?: Partial<ProviderProfile>;
}

export function CreateOrUpdateProfile({
    providerProfile,
}: CreateOrUpdateProfileProps) {
    const providerProfileForm = useForm<ProviderProfile>({
        mode: 'onChange',
        defaultValues: {
            gender: Gender.MAP.PREFER_NOT_TO_SAY,
            designation: ProfileType.therapist,
            minimumRate: 0,
            languagesSpoken: [Language.MAP.ENGLISH],
            modalities: [Modality.MAP.INDIVIDUALS],
            ageGroups: [AgeGroup.MAP.ADULTS],
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
    const state = 'TODO: Get from practice';
    const acceptedInsurances = providerProfileForm.watch('acceptedInsurances');
    const specialties = providerProfileForm.watch('specialties');
    const bio = providerProfileForm.watch('bio');
    const offersInPerson = providerProfileForm.watch('offersInPerson');
    const offersVirtual = providerProfileForm.watch('offersVirtual');
    const profileImageUrl = providerProfileForm.watch('profileImageUrl');

    console.log({ specialties });
    const onImageUploadError = (error: Error | string) => {
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
        console.log({ result });
        providerProfileForm.setValue('profileImageUrl', result.info.secure_url);
    };
    return (
        <TwoColumnGrid
            leftSlot={
                <ProfileEditorForm
                    offersSlidingScale={offersSlidingScale}
                    control={providerProfileForm.control}
                    isTherapist={designation === ProfileType.therapist}
                    minimumRate={minimumRate}
                    onImageUploadSuccess={onImageUploadSuccess}
                    onImageUploadError={onImageUploadError}
                />
            }
            rightSlot={
                <ProviderProfileUi
                    profileImageUrl={profileImageUrl}
                    givenName={givenName}
                    surname={surname}
                    pronouns={pronouns}
                    state={state}
                    acceptedInsurances={acceptedInsurances}
                    specialties={specialties}
                    bio={bio}
                    offersInPerson={offersInPerson}
                    offersVirtual={offersVirtual}
                />
            }
        />
    );
}
