import React from 'react';
import { MjmlColumn, MjmlSection, MjmlWrapper, MjmlSpacer } from 'mjml-react';
import BaseLayout from './components/BaseLayout';
import Header from './components/Header';
import Text from './components/Text';
import Footer from './components/Footer';
import { fontSize, colors, spacing, screens } from './theme';
import Link from './components/Link';
import { AcceptRequestEmailProps } from './schema/acceptRequestEmail';

function formatSalutations(memberName?: string) {
    return memberName ? `Hi ${memberName},` : 'Hi,';
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

const AcceptRequest = ({
    memberName,
    providerName,
}: AcceptRequestEmailProps) => {
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
                            Great News!
                        </Text>
                        <Text cssClass="p" paddingBottom={spacing.s7}>
                            {providerName} has accepted your request! They have
                            received your information and are interested in
                            scheduling a consultation with you.
                        </Text>
                        <Text cssClass="p" paddingBottom={spacing.s7}>
                            As a next step, {providerName} should be reaching
                            out to you shortly to schedule a consultation. We
                            are so excited for you both to start working
                            together.
                        </Text>
                        <Text cssClass="p" paddingBottom={spacing.s7}>
                            Please don’t hesitate to reach out to us at{' '}
                            <Link href="mailto:help@therify.co">
                                help@therify.co
                            </Link>{' '}
                            should you have any questions or additional needs
                            for support.
                        </Text>
                    </MjmlColumn>
                </MjmlSection>

                <MjmlSection
                    cssClass="gutter"
                    backgroundColor={'#F2F4F2'}
                    paddingTop={spacing.s3}
                >
                    <MjmlColumn>
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
AcceptRequest.subject = 'Therify | Your request has been accepted!';
export default AcceptRequest;
