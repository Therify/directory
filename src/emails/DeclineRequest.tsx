import React from 'react';
import { MjmlColumn, MjmlSection, MjmlWrapper, MjmlSpacer } from 'mjml-react';
import BaseLayout from './components/BaseLayout';
import Header from './components/Header';
import Text from './components/Text';
import Footer from './components/Footer';
import { fontSize, colors, spacing, screens } from './theme';
import Link from './components/Link';
import { DeclineRequestEmailProps } from './schema/declineRequestEmail';

interface GenerateMailToProps {
    memberEmail: string;
    memberName: string;
    providerName: string;
}

function formatSalutations(memberName?: string) {
    return memberName ? `Hello ${memberName},` : 'Hello,';
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

const DeclineRequestEmail = ({
    memberName,
    providerName,
    providerNotes,
}: DeclineRequestEmailProps) => {
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
                            {formatSalutations(memberName)} <br />
                        </Text>
                        <Text cssClass="p" paddingBottom={spacing.s7}>
                            Thank you so much for expressing interest in
                            {providerName}. Unfortunately, they are not able to
                            accept new clients at this time.
                        </Text>
                        {providerNotes && (
                            <Text cssClass="p">{providerNotes}</Text>
                        )}
                        <Text cssClass="p" paddingBottom={spacing.s7}>
                            As a next step, please click here (
                            <Link href="https://app.therify.co">
                                app.therify.co
                            </Link>
                            ) to be directed back to Therify&apos;s directory
                            list to find an available provider who is ready to
                            support you!
                        </Text>
                    </MjmlColumn>
                </MjmlSection>

                <MjmlSection
                    cssClass="gutter"
                    backgroundColor={'#F2F4F2'}
                    paddingTop={spacing.s3}
                >
                    <MjmlColumn>
                        <MjmlSpacer height={spacing.s1} />
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
DeclineRequestEmail.subject = 'Therify | Your recent connection request';
export default DeclineRequestEmail;
