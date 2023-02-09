/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { MjmlColumn, MjmlGroup, MjmlSection, MjmlWrapper } from 'mjml-react';
import Text from './Text';
import Link from './Link';
import { colors, fontSize, lineHeight, fontWeight } from '../theme';

export default function Header() {
    return (
        <MjmlWrapper padding="40px 0 64px" backgroundColor={colors.paper}>
            <MjmlSection cssClass="gutter">
                <MjmlGroup>
                    <MjmlColumn>
                        <Text align="center">
                            <Link
                                color={colors.black}
                                fontSize={fontSize.xl}
                                fontWeight={fontWeight.bold}
                                href="https://therify.co"
                                textDecoration="none"
                            >
                                <img
                                    height={24}
                                    width={170}
                                    src={
                                        'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453089/app.therify.co/logo/therify-logo_wqj1is.png'
                                    }
                                    alt=""
                                    style={{
                                        verticalAlign: 'text-bottom',
                                        paddingRight: 10,
                                        paddingBottom: 2,
                                    }}
                                />
                            </Link>
                        </Text>
                    </MjmlColumn>
                </MjmlGroup>
            </MjmlSection>
        </MjmlWrapper>
    );
}
