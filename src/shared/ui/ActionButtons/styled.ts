import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.lg};
`;
