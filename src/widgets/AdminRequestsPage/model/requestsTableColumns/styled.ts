import styled from 'styled-components';

export const DownloadButton = styled.button`
  color: ${({ theme }) => theme.text.accent};
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-decoration: underline;

  &:disabled {
    color: ${({ theme }) => theme.text.muted};
    cursor: not-allowed;
  }
`;
