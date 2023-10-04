import {
    Jumbotron,
    JumbotronProps,
} from '@/lib/shared/components/ui/Jumbotron';
import { URL_PATHS } from '@/lib/sitemap';
import { useRouter } from 'next/router';

export const TEST_IDS = {
    CARE_JUMBOTRON: 'care-jumbotron',
} as const;

export interface CareJumbotronProps {
    hasCompletedSelfAssessment: boolean;
    hasRecommendationsForReview: boolean;
    hasCareTeam: boolean;
    careNavigatorName?: string;
}

export function CareJumbotron({
    hasCompletedSelfAssessment,
    hasRecommendationsForReview,
    hasCareTeam,
    careNavigatorName,
}: CareJumbotronProps) {
    const router = useRouter();

    // TODO: change background image urls to the final images
    const hasCareTeamProps: JumbotronProps = {
        headerText: 'Build your Care Team!',
        callToAction: {
            label: 'Request another provider',
            onClick: () => router.push(URL_PATHS.MEMBERS.CARE.SELF_ASSESSMENT),
        },
        backgroundProps: {
            backgroundImageUrl:
                'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453029/app.therify.co/login/8_jvntyl.jpg',
        },
    };

    const hasRecommendationsForReviewProps: JumbotronProps = {
        headerText: "You've got Provider Recommendations!",
        callToAction: {
            label: 'View recommendations',
            onClick: () => router.push(URL_PATHS.MEMBERS.CARE.ROOT),
        },
        backgroundProps: {
            backgroundImageUrl:
                'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453029/app.therify.co/login/10_dj9do6.jpg',
        },
    };

    const hasPendingRecommendationsProps: JumbotronProps = {
        headerText: `${
            careNavigatorName ? `${careNavigatorName} is` : "We're"
        } looking for providers to recommend!`,
        subHeaderText:
            "You'll be notified when your Recommendations are ready.",
        backgroundProps: {
            backgroundImageUrl:
                'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453029/app.therify.co/login/9_czs8ut.jpg',
        },
    };

    const defaultProps: JumbotronProps = {
        headerText: 'Get matched with your first Provider!',
        callToAction: {
            label: 'Get Matched',
            onClick: () => router.push(URL_PATHS.MEMBERS.CARE.SELF_ASSESSMENT),
        },
        backgroundProps: {
            backgroundImageUrl:
                'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453028/app.therify.co/login/7_rz30ni.jpg',
        },
    };

    if (hasCareTeam) return <Jumbotron {...hasCareTeamProps} />;
    if (hasRecommendationsForReview)
        return <Jumbotron {...hasRecommendationsForReviewProps} />;
    if (hasCompletedSelfAssessment)
        return <Jumbotron {...hasPendingRecommendationsProps} />;
    return <Jumbotron {...defaultProps} />;
}
