import { ProviderSearch } from '@/lib/modules/directory/features';
import { DirectoryServiceParams } from '../params';
import {
    ListingStatus,
    PlanStatus,
    ProfileType,
    ProviderProfile,
} from '@prisma/client';
import { ProviderCredential, Country, Region } from '@/lib/shared/types';
import { DirectoryProfile } from '@/lib/shared/types/presentation';

interface CreateConnectionFactoryParams extends DirectoryServiceParams {}

export const factory = ({ prisma }: CreateConnectionFactoryParams) => {
    return async function executeProviderSearch(
        input: ProviderSearch.Input
    ): Promise<ProviderSearch.Output> {
        const { selfAssessment } = input;
        const isAtRisk =
            selfAssessment.phq9Score > 14 ||
            selfAssessment.hasSuicidalIdeation ||
            selfAssessment.isInCrisis;
        const profileResults = await prisma.providerProfile.findMany({
            where: {
                OR: [
                    {
                        designation: ProfileType.therapist,
                        directoryListing: {
                            status: ListingStatus.listed,
                        },
                        // Practice has active plan
                        practiceProfile: {
                            practice: {
                                plans: {
                                    some: {
                                        endDate: {
                                            gt: new Date(),
                                        },
                                        startDate: {
                                            lte: new Date(),
                                        },
                                        status: {
                                            in: [
                                                PlanStatus.active,
                                                PlanStatus.trialing,
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                        credentials: {
                            isEmpty: false,
                        },
                    },
                    !isAtRisk
                        ? {
                              designation: ProfileType.coach,
                              directoryListing: {
                                  status: ListingStatus.listed,
                              },
                              // Practice has active plan
                              practiceProfile: {
                                  practice: {
                                      plans: {
                                          some: {
                                              endDate: {
                                                  gt: new Date(),
                                              },
                                              startDate: {
                                                  lte: new Date(),
                                              },
                                              status: {
                                                  in: [
                                                      PlanStatus.active,
                                                      PlanStatus.trialing,
                                                  ],
                                              },
                                          },
                                      },
                                  },
                              },
                          }
                        : {},
                ],
            },
        });
        // Because Prisma's Postgres connection doesn't support filtering on object key values inside JSON arrays,
        // we have to filter the credential results outside of the query
        // Prisma docs: https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-object-key-value-inside-array

        const eligibleProfiles = profileResults.filter((profile) => {
            if (profile.designation === ProfileType.therapist) {
                const inStateCredentials = getInRegionCredentials(
                    input.state,
                    input.country,
                    profile.credentials
                );
                return inStateCredentials.length > 0;
            }
            return true;
        });
        return {
            profiles: eligibleProfiles.map(DirectoryProfile.validate),
        };
    };
};

const getInRegionCredentials = (
    region: Region.Type,
    country: Country.Country,
    credentials: ProviderProfile['credentials']
) => {
    return credentials.filter((credential) => {
        const parsedCredential =
            ProviderCredential.schema.safeParse(credential);

        return (
            parsedCredential.success &&
            // TODO: All DB credentials need a country added or a default value, otherwise this will fail
            parsedCredential.data.country === country &&
            parsedCredential.data.state === region &&
            new Date(parsedCredential.data.expirationDate).getTime() >
                new Date().getTime()
        );
    });
};
