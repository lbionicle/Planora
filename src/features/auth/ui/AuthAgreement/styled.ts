'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Text = styled.p`
  color: ${({ theme }) => theme.text.muted};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.md};
`;

export const PrivacyLink = styled(Link)`
  color: ${({ theme }) => theme.text.muted};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-decoration: underline;
  text-underline-offset: ${({ theme }) => theme.spacing.xs7};
`;
