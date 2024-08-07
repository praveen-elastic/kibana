/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { FC } from 'react';
import React, { memo } from 'react';
import { EuiFlyoutBody, EuiPanel } from '@elastic/eui';
import { css } from '@emotion/react';

interface FlyoutBodyProps extends React.ComponentProps<typeof EuiFlyoutBody> {
  children: React.ReactNode;
}

/**
 * Wrapper of `EuiFlyoutBody`, setting the recommended `16px` padding using a EuiPanel.
 */
export const FlyoutBody: FC<FlyoutBodyProps> = memo(({ children, ...flyoutBodyProps }) => {
  return (
    <EuiFlyoutBody
      {...flyoutBodyProps}
      css={css`
        .euiFlyoutBody__overflow {
          // fix a bug with red overlay when position was not set
          // remove when changes in EUI are merged
          transform: translateZ(0);
        }
      `}
    >
      <EuiPanel hasShadow={false} color="transparent">
        {children}
      </EuiPanel>
    </EuiFlyoutBody>
  );
});

FlyoutBody.displayName = 'FlyoutBody';
