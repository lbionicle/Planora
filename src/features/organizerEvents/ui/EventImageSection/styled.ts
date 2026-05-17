import styled from 'styled-components';

import { media } from '@/shared/styles';
import Button from '@/shared/ui/Button';

interface ActionButtonProps {
  $hasImage: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
`;

export const Preview = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.background.secondary};

  @media ${media.laptop} {
    height: 340px;
  }

  @media ${media.tablet} {
    height: 280px;
  }

  @media ${media.mobile} {
    height: 220px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

export const PreviewImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    object-fit: cover;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.fileUpload.backgroundOverlay};
  inset: 0;
`;

export const Controls = styled.span``;

export const ActionButton = styled(Button).attrs({
  colorScheme: 'secondary',
})<ActionButtonProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);

  ${({ theme, $hasImage }) => `
  color: ${$hasImage ? theme.status.danger : theme.text.accent}
  `}
`;

export const FileInput = styled.input`
  display: none;
`;
