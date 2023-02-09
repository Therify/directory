import React from 'react';
import { MjmlColumn, MjmlSection, MjmlSpacer, MjmlWrapper } from 'mjml-react';
import BaseLayout from './components/BaseLayout';
import Button from './components/Button';
import Footer from './components/Footer';
import Heading from './components/Heading';
import Header from './components/Header';
import Text from './components/Text';
import { fontSize, colors, spacing, fontFamily, screens } from './theme';

const welcomeStyle = `
  .h1 > * {
    font-size: 56px !important;
    font-weight: bold;
  }
  .h2 > * {
    font-size: ${fontSize.lg}px !important;
    font-weight: bold;
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
    }
    .p > * {
      font-size: ${fontSize.md}px !important;
    }
  }
`;

type WelcomeProps = {
    includeUnsubscribe?: boolean;
};

const Welcome = ({ includeUnsubscribe }: WelcomeProps) => {
    return (
        <BaseLayout width={600} style={welcomeStyle}>
            <Header />
            <MjmlWrapper backgroundColor={colors.white}>
                <MjmlSection paddingBottom={spacing.s11} cssClass="gutter">
                    <MjmlColumn>
                        <Heading maxWidth={420} cssClass="h1" fontWeight={600}>
                            This is a Heading 1
                        </Heading>
                    </MjmlColumn>
                </MjmlSection>
                <MjmlSection paddingBottom={spacing.s11} cssClass="gutter">
                    <MjmlColumn>
                        <Heading
                            cssClass="h2"
                            paddingBottom={spacing.s6}
                            fontWeight={600}
                        >
                            This is a Heading 2
                        </Heading>
                        <Text cssClass="p" paddingBottom={spacing.s7}>
                            This is some body copy
                        </Text>
                        <Button
                            href="https://mailing.run/docs"
                            align="left"
                            cssClass="sm-hidden"
                        >
                            Check out the Docs{'  '}
                            <span style={{ fontFamily: fontFamily.serif }}>
                                &rarr;
                            </span>
                        </Button>
                        <MjmlSpacer height={spacing.s3} cssClass="lg-hidden" />
                        <Button
                            href="https://mailing.run/docs"
                            align="center"
                            cssClass="lg-hidden"
                        >
                            Edit this button
                        </Button>
                        <MjmlSpacer height={spacing.s9} />
                    </MjmlColumn>
                </MjmlSection>
            </MjmlWrapper>
        </BaseLayout>
    );
};
Welcome.subject = 'Thank you for installing Mailing :)';
export default Welcome;
