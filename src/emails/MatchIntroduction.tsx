import React from 'react';
import { MjmlColumn, MjmlSection, MjmlWrapper } from 'mjml-react';
import BaseLayout from './components/BaseLayout';
import Divider from './components/Divider';
import Heading from './components/Heading';
import Header from './components/Header';
import Text from './components/Text';
import Footer from './components/Footer';
import { fontSize, colors, spacing, screens } from './theme';
import Link from './components/Link';

interface GenerateMailToProps {
    memberEmail: string;
    memberName: string;
    providerName: string;
}

function generateMailTo({
    memberEmail,
    providerName,
    memberName,
}: GenerateMailToProps) {
    return `mailto:${memberEmail}?subject=Your%20Therify%20Provider%20%7C%20Hello%20from%2C%20${providerName}!&body=Hi%20${memberName}%2C%20this%20is%20${providerName}%2C%20your%20provider%20from%20Therify%2C%20I'm%20excited%20to%20meet%20you!%20Once%20you're%20ready%20to%20get%20started%2C%20just%20reply%20to%20this%20email.`;
}

const matchIntroductionStyle = `
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

type MatchIntroductionProps = {
    member: {
        givenName: string;
        emailAddress: string;
        state: string;
    };
    plan?: {
        numberOfCoveredSessions: number;
    };
    provider: {
        giveName: string;
    };
};

const MatchIntroduction = ({
    member,
    plan,
    provider,
}: MatchIntroductionProps) => {
    return (
        <BaseLayout width={600} style={matchIntroductionStyle}>
            <Header />
            <MjmlWrapper backgroundColor={colors.white}>
                <MjmlSection padding={`${spacing.s6}px 0`} cssClass="gutter">
                    <MjmlColumn>
                        <Heading
                            cssClass="h2"
                            fontWeight={600}
                            align={'center'}
                        >
                            You&apos;ve been matched!
                        </Heading>
                        <Divider />
                    </MjmlColumn>
                </MjmlSection>
                <MjmlSection paddingBottom={spacing.s3} cssClass="gutter">
                    <MjmlColumn>
                        <Text cssClass="p" paddingBottom={spacing.s7}>
                            Hello {provider.giveName}, <br />
                            This is the Therify Care Team. We&apos;d like to
                            introduce you to {member.givenName} (email:{' '}
                            <Link
                                href={generateMailTo({
                                    memberName: member.givenName,
                                    providerName: provider.giveName,
                                    memberEmail: member.emailAddress,
                                })}
                            >
                                {member.emailAddress}
                            </Link>
                            ), a potential client in {member.state} who is
                            insterested in consultation with you. <br />
                        </Text>
                    </MjmlColumn>
                </MjmlSection>
                {plan && (
                    <MjmlSection
                        cssClass="gutter"
                        backgroundColor={'#E6F1E7'}
                        paddingTop={spacing.s3}
                    >
                        <MjmlColumn>
                            <Text cssClass="p" fontWeight={600} align="center">
                                Covered Sessions
                            </Text>
                            <Text cssClass="p" paddingBottom={spacing.s7}>
                                If you both decide to work together{' '}
                                <span style={{ fontWeight: 600 }}>
                                    Therify will cover the cost of the first{' '}
                                    {plan.numberOfCoveredSessions} sessions.
                                </span>{' '}
                                Please let us know if you have any questions;
                                otherwise, we&apos;ll let you take it from here.
                            </Text>
                        </MjmlColumn>
                    </MjmlSection>
                )}
            </MjmlWrapper>
            <Footer />
        </BaseLayout>
    );
};
MatchIntroduction.subject = 'Thank you for installing Mailing :)';
export default MatchIntroduction;
