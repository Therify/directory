import React from 'react';
import { MjmlDivider } from 'mjml-react';
import { spacing } from '../theme';

export default function Divider() {
    return (
        <>
            <MjmlDivider
                paddingTop={spacing.s3}
                paddingBottom={spacing.s3}
                borderStyle="solid"
                borderWidth="1px"
                borderColor="#E2E8F0"
            ></MjmlDivider>
        </>
    );
}
