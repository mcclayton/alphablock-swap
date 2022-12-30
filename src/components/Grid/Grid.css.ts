import { style } from '@vanilla-extract/css';
import { BORDER_COLOR, SPACING } from 'theme.css';

export const grid = style({
  border: '3px solid #5c5b5b',
  borderRadius: '8px',
  padding: '8px',
  background: BORDER_COLOR,
  width: 'fit-content',
});

export const gridWrapper = style({
  padding: SPACING,
});
