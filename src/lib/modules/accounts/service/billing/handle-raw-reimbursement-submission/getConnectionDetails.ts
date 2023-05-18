import { Practice, PrismaClient, ProviderProfile, User } from '@prisma/client';
interface ProviderInput {
    firstName: string;
    lastName: string;
    email: string;
    practiceName: string;
}
interface getConnectionDetailsParams {
    memberId: string;
    provider: ProviderInput;
    prisma: PrismaClient;
}

export const getConnectionDetails = async ({
    memberId,
    provider,
    prisma,
}: getConnectionDetailsParams): Promise<{
    memberId: string;
    providerProfileId?: string;
    practiceId?: string;
}> => {
    // Get connection request from member Id
    // Find provider profile Id from connection request comparing provider name and email
    // Find practice Id from provider profile Id
    const connectionRequests = await prisma.connectionRequest.findMany({
        where: { memberId },
        select: {
            connectionStatus: true,
            providerProfile: {
                select: {
                    id: true,
                    givenName: true,
                    surname: true,
                    contactEmail: true,
                    user: true,
                    practiceProfile: {
                        select: {
                            practice: true,
                        },
                    },
                },
            },
        },
    });

    const matchingConnectionRequests = connectionRequests.filter((request) => {
        const { providerProfile } = request;
        if (!providerProfile) return false;
        return isProvider(providerProfile, provider);
    });
    const [accepted] = matchingConnectionRequests.filter(
        (request) => request.connectionStatus === 'accepted'
    );
    if (accepted) {
        return {
            memberId,
            providerProfileId: accepted.providerProfile.id,
            practiceId: accepted.providerProfile.practiceProfile?.practice.id,
        };
    }
    if (matchingConnectionRequests.length > 0) {
        // Matching profile, but no accepted connection requests
        if (matchingConnectionRequests.length === 1) {
            // assume the one connection request is the provider and they just didnt accept the client
            const [matchedRequest] = matchingConnectionRequests;
            return {
                memberId: memberId,
                providerProfileId: matchedRequest.providerProfile.id,
                practiceId:
                    matchedRequest.providerProfile.practiceProfile?.practice.id,
            };
        }
        // No accepted connection requests found
        throw new Error(
            '[getConnectionDetails]: Cannot determine which provider issued session'
        );
    }

    if (connectionRequests.length > 0) {
        //check if we can at least find a matching practice
        const matchedPracticeRequest = connectionRequests.find(
            ({ providerProfile }) => {
                return isPractice(
                    providerProfile.practiceProfile?.practice,
                    provider.practiceName
                );
            }
        );

        if (matchedPracticeRequest) {
            return {
                memberId,
                practiceId:
                    matchedPracticeRequest.providerProfile.practiceProfile
                        ?.practice.id,
            };
        }
    }

    return {
        memberId,
    };
};

const isProvider = (
    providerProfile: Pick<
        ProviderProfile,
        'id' | 'givenName' | 'surname' | 'contactEmail'
    > & {
        user: User | null;
        practiceProfile?: {
            practice: Practice | null;
        } | null;
    },
    provider: ProviderInput
) => {
    if (!providerProfile) return false;
    const { user: profileOwner } = providerProfile;
    if (profileOwner) {
        const isEmailMatch = profileOwner.emailAddress === provider.email;
        const isNameMatch =
            isSameString(profileOwner.givenName, provider.firstName) &&
            isSameString(profileOwner.surname, provider.lastName);
        if (isEmailMatch || isNameMatch) return true;
    }

    const isProfileEmailMatch = providerProfile.contactEmail === provider.email;
    const isProfileNameMatch =
        isSameString(providerProfile.givenName, provider.firstName) &&
        isSameString(providerProfile.surname, provider.lastName);

    if (isProfileEmailMatch || isProfileNameMatch) return true;

    return false;
};

const isPractice = (practice: Practice | undefined, practiceName: string) => {
    if (!practice) return false;
    return (
        isSameString(practice.name, practiceName) ||
        cleanString(practice.name).includes(cleanString(practiceName)) ||
        cleanString(practiceName).includes(cleanString(practice.name))
    );
};

const cleanString = (str: string) => {
    return str.toLowerCase().trim();
};

const isSameString = (str1: string, str2: string) => {
    return cleanString(str1) === cleanString(str2);
};
