import { style } from '@vanilla-extract/css';

export const GRID_BORDER = '2px';

export const grid = style({
  background: 'black',
  width: 'fit-content',
});

export const gridWrapper = style({
  padding: GRID_BORDER,
});

export const row = style({
  display: 'flex',
});
