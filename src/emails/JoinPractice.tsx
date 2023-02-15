import React from 'react';
import { MjmlColumn, MjmlSection, MjmlSpacer, MjmlWrapper } from 'mjml-react';
import BaseLayout from './components/BaseLayout';
import Button from './components/Button';
import Heading from './components/Heading';
import Header from './components/Header';
import Text from './components/Text';
import { fontSize, colors, spacing, fontFamily, screens } from './theme';
import Link from './components/Link';

const joinPracticeStyle = `
  .h2 > * {
    font-size: ${fontSize.lg}px !important;
    font-weight: bold;
    text-align: center;
  }
  .p > * {
    font-size: ${fontSize.base}px !important;
    color: ${colors.gray600};
  }

  @media (min-width:${screens.xs}) {
    .h1 > * {
      font-size: 84px !important;
      font-weight: bold;
    }
    .h2 > * {
      font-size: ${fontSize.xxl}px !important;
      font-weight: bold;
      text-align: center;
    }
    .p > * {
      font-size: ${fontSize.md}px !important;
    }
  }
`;

type JoinPracticeProps = {
    invitationLink: string;
    practiceName: string;
};

const JoinPractice = ({ invitationLink, practiceName }: JoinPracticeProps) => {
    return (
        <BaseLayout width={600} style={joinPracticeStyle}>
            <Header />
            <MjmlWrapper backgroundColor={colors.white}>
                <MjmlSection
                    paddingBottom={spacing.s11}
                    paddingTop={spacing.s11}
                    cssClass="gutter"
                >
                    <MjmlColumn>
                        <Heading
                            cssClass="h2"
                            fontWeight={600}
                            align={'center'}
                        >
                            You&apos;ve been invited to join {practiceName}.
                        </Heading>
                    </MjmlColumn>
                </MjmlSection>
                <MjmlSection paddingBottom={spacing.s11} cssClass="gutter">
                    <MjmlColumn>
                        <Text
                            cssClass="p"
                            paddingBottom={spacing.s7}
                            align={'center'}
                        >
                            Follow this link below to join the practice and
                            complete your profile.
                        </Text>
                        <MjmlSpacer height={spacing.s3} cssClass="lg-hidden" />
                        <Button
                            href={invitationLink}
                            align="center"
                            paddingBottom={spacing.s3}
                        >
                            Join Practice
                        </Button>
                        <Text align="center">
                            <Link href={invitationLink}>
                                Follow this link to join {practiceName}
                            </Link>
                        </Text>
                        <MjmlSpacer height={spacing.s9} />
                    </MjmlColumn>
                </MjmlSection>
            </MjmlWrapper>
        </BaseLayout>
    );
};
JoinPractice.subject = "🎉 Therify | You've been Invited! 🎉";
export default JoinPractice;
