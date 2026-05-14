import styled from 'styled-components';

export const ToggleButton = styled.button`
  color: ${({ theme }) => theme.text.secondary};
  width: ${({ theme }) => theme.size.icon.md};
  height: ${({ theme }) => theme.size.icon.md};
  display: flex;
  justify-content: center;
  align-items: center;
`;
