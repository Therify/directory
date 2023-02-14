import React from 'react';
import { MjmlColumn, MjmlSection, MjmlWrapper, MjmlSpacer } from 'mjml-react';
import BaseLayout from './components/BaseLayout';
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

function formatSalutations(providerName?: string) {
    return providerName ? `Hello ${providerName},` : 'Hello,';
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

interface ReferralEmailProps {
    member: {
        state: string;
        insurance: string;
        concerns: string[];
        givenName: string;
        surname: string;
        emailAddress: string;
    };
    plan?: {
        numberOfCoveredSessions: number;
        planName: string;
    };
    provider: {
        givenName?: string;
    };
}

const ReferralEmail = ({ member, plan, provider }: ReferralEmailProps) => {
    const memberConcerns = member.concerns ?? [];
    return (
        <BaseLayout width={600} style={matchIntroductionStyle}>
            <Header />
            <MjmlWrapper backgroundColor={colors.white}>
                <MjmlSection
                    paddingBottom={spacing.s3}
                    paddingTop={spacing.s4}
                    cssClass="gutter"
                >
                    <MjmlColumn>
                        <Text cssClass="p" paddingBottom={spacing.s7}>
                            {formatSalutations(provider.givenName)} <br />
                            My name is {member.givenName} (
                            <Link
                                href={generateMailTo({
                                    memberName: member.givenName,
                                    providerName:
                                        provider.givenName ?? 'Your name here',
                                    memberEmail: member.emailAddress,
                                })}
                            >
                                {member.emailAddress}
                            </Link>
                            ) and I would like to schedule a consultation with
                            you.
                            <br />
                        </Text>
                        <Text cssClass="p">
                            Here is some information about me:
                        </Text>
                        <Text cssClass="p" paddingLeft={spacing.s3}>
                            <ul>
                                {plan && (
                                    <li>
                                        Organization / Employer: {plan.planName}
                                    </li>
                                )}
                                <li>State: {member.state}</li>
                                <li>Insurance: {member.insurance}</li>
                                {memberConcerns.length > 0 && (
                                    <li>
                                        Concerns:{' '}
                                        {memberConcerns.map(
                                            (concern, index) => (
                                                <span key={index}>
                                                    {concern}
                                                    {index !==
                                                    member.concerns.length - 1
                                                        ? ', '
                                                        : ''}
                                                </span>
                                            )
                                        )}
                                    </li>
                                )}
                                {plan && (
                                    <li>
                                        Number of covered sessions:{' '}
                                        {plan.numberOfCoveredSessions}
                                    </li>
                                )}
                            </ul>
                        </Text>
                        <Text cssClass="p" paddingBottom={spacing.s4}>
                            When are you next available for an appointment?
                        </Text>
                        <Text cssClass="p" paddingBottom={spacing.s4}>
                            Thank you!
                        </Text>
                        <Text cssClass="p" paddingBottom={spacing.s4}>
                            {member.givenName}
                        </Text>
                    </MjmlColumn>
                </MjmlSection>

                <MjmlSection
                    cssClass="gutter"
                    backgroundColor={'#F2F4F2'}
                    paddingTop={spacing.s3}
                >
                    <MjmlColumn>
                        <Text cssClass="p" paddingBottom={spacing.s4}>
                            <span style={{ fontWeight: 500 }}>
                                A note from Therify
                            </span>
                            : Please response to Therify members as soon as
                            possible. If you are unable to accept new clients,
                            please refer them back to Therify and update your
                            availability on your Provider Profile.
                        </Text>
                        <MjmlSpacer height={spacing.s1} />
                        <Text paddingBottom={spacing.s1}>
                            Provider support:{' '}
                            <Link href="mailto:providers@therify.co">
                                providers@therify.co
                            </Link>
                        </Text>
                        <Text paddingBottom={spacing.s4}>
                            Member support:{' '}
                            <Link href="mailto:help@therify.co">
                                help@therify.co
                            </Link>
                        </Text>
                        <Text fontStyle="italic" paddingBottom={spacing.s4}>
                            The content of this email is confidential and
                            intended for the recipient specified in the message
                            only. If you received this message by mistake,
                            please reply to this message and follow with its
                            deletion so that we can ensure such a mistake doest
                            not occur in the future.
                        </Text>
                    </MjmlColumn>
                </MjmlSection>
            </MjmlWrapper>
            <Footer />
        </BaseLayout>
    );
};
ReferralEmail.subject = 'New Referral from Therify';
export default ReferralEmail;
