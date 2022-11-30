import { style } from '@vanilla-extract/css';
import { BORDER_COLOR, SPACING } from 'theme.css';

export const grid = style({
  background: BORDER_COLOR,
  width: 'fit-content',
});

export const gridWrapper = style({
  padding: SPACING,
});

export const row = style({
  display: 'flex',
});
