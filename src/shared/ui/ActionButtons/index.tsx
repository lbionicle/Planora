import { ButtonHTMLAttributes, HTMLAttributes } from 'react';

import Button, { ButtonColorScheme, ButtonSize } from '@/shared/ui/Button';

import * as S from './styled';

export interface ActionButtonsProps extends HTMLAttributes<HTMLDivElement> {
  primaryText: string;
  secondaryText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  secondaryType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  primaryForm?: string;
  primaryColorScheme?: ButtonColorScheme;
  secondaryColorScheme?: ButtonColorScheme;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
}

export default function ActionButtons({
  primaryText,
  secondaryText,
  onPrimaryClick,
  onSecondaryClick,
  primaryType = 'button',
  secondaryType = 'button',
  primaryForm,
  primaryColorScheme = 'accent',
  secondaryColorScheme = 'secondary',
  size = 'lg',
  isLoading = false,
  loadingText = 'Загрузка...',
  disabled = false,
  primaryDisabled = false,
  secondaryDisabled = false,
  ...props
}: ActionButtonsProps) {
  return (
    <S.Wrapper {...props}>
      {secondaryText && (
        <Button
          colorScheme={secondaryColorScheme}
          data-slot="secondary"
          disabled={disabled || secondaryDisabled || isLoading}
          size={size}
          type={secondaryType}
          onClick={onSecondaryClick}
        >
          {secondaryText}
        </Button>
      )}

      <Button
        colorScheme={primaryColorScheme}
        data-slot="primary"
        disabled={disabled || primaryDisabled || isLoading}
        form={primaryForm}
        size={size}
        type={primaryType}
        onClick={onPrimaryClick}
      >
        {isLoading ? loadingText : primaryText}
      </Button>
    </S.Wrapper>
  );
}
