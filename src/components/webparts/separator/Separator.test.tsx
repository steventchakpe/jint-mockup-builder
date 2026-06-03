import { render, screen } from '@testing-library/react';
import { Separator } from './Separator';
import { separatorDefaultConfig } from './Separator.config';
import type { SeparatorContent } from './Separator.types';

const withText: SeparatorContent = { text: { value: 'Nos actualités' }, showText: true };
const noText: SeparatorContent = { text: {}, showText: false };

describe('Separator', () => {
  it('renders the text when showText is true', () => {
    render(<Separator config={separatorDefaultConfig} content={withText} />);
    expect(screen.getByText('Nos actualités')).toBeInTheDocument();
  });

  it('renders left + right bars in inBetween/center', () => {
    render(<Separator config={separatorDefaultConfig} content={withText} />);
    expect(screen.getByTestId('separator-left-bar')).toBeInTheDocument();
    expect(screen.getByTestId('separator-right-bar')).toBeInTheDocument();
  });

  it('renders a single bar when showText is false', () => {
    render(<Separator config={separatorDefaultConfig} content={noText} />);
    expect(screen.getByTestId('separator-notext-bar')).toBeInTheDocument();
  });

  it('renders onTop layout', () => {
    render(
      <Separator config={{ ...separatorDefaultConfig, textPosition: 'onTop' }} content={withText} />,
    );
    expect(screen.getByTestId('separator-ontop-bar')).toBeInTheDocument();
  });

  it('renders inside layout', () => {
    render(
      <Separator config={{ ...separatorDefaultConfig, textPosition: 'inside' }} content={withText} />,
    );
    expect(screen.getByTestId('separator-inside-bar')).toBeInTheDocument();
  });
});
