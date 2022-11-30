import { style } from '@vanilla-extract/css';
import { BORDER_COLOR, BORDER_WIDTH } from 'theme.css';

export const grid = style({
  background: BORDER_COLOR,
  width: 'fit-content',
});

export const gridWrapper = style({
  padding: BORDER_WIDTH,
});

export const row = style({
  display: 'flex',
});
