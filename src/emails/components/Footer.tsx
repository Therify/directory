import React from 'react';
import {
    MjmlSection,
    MjmlWrapper,
    MjmlColumn,
    MjmlText,
    MjmlImage,
    MjmlGroup,
} from 'mjml-react';
import Link from './Link';
import { colors, fontSize, fontWeight, spacing } from '../theme';
import { EMAIL_PREFERENCES_URL } from 'mailing-core';

type FooterProps = {
    includeUnsubscribe?: boolean;
};

export default function Footer({ includeUnsubscribe = false }: FooterProps) {
    return (
        <>
            <MjmlWrapper backgroundColor={colors.paper}>
                <MjmlSection padding={`${spacing.s6}px 0`}>
                    <MjmlColumn>
                        <MjmlText align="center">With 🧡 from Therify</MjmlText>
                    </MjmlColumn>
                </MjmlSection>
            </MjmlWrapper>

            <MjmlWrapper>
                <MjmlSection
                    paddingTop={32}
                    paddingBottom={24}
                    cssClass="gutter"
                >
                    <MjmlColumn>
                        <MjmlText
                            align="center"
                            fontSize={fontSize.xs}
                            color={colors.slate400}
                            fontWeight={fontWeight.bold}
                            textTransform="uppercase"
                        >
                            Therify {new Date().getFullYear()}
                        </MjmlText>

                        {includeUnsubscribe && (
                            <MjmlText
                                align="center"
                                fontSize={fontSize.xs}
                                color={colors.slate400}
                                paddingTop={12}
                            >
                                You&rsquo;re receiving this email because you
                                asked for occasional updates about Mailing. If
                                you don&rsquo;t want to receive these in the
                                future, you can{' '}
                                <Link
                                    color={colors.slate400}
                                    textDecoration="underline"
                                    href={EMAIL_PREFERENCES_URL}
                                >
                                    unsubscribe.
                                </Link>
                            </MjmlText>
                        )}
                    </MjmlColumn>
                </MjmlSection>
            </MjmlWrapper>
        </>
    );
}
