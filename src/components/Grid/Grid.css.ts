import { style } from '@vanilla-extract/css';
import { BORDER_COLOR, GRID_CONTAINER_BORDER, SPACING } from 'theme.css';

export const grid = style({
  border: `3px solid ${GRID_CONTAINER_BORDER}`,
  borderRadius: '8px',
  padding: '8px',
  background: BORDER_COLOR,
  width: 'fit-content',
});

export const gridWrapper = style({
  padding: SPACING,
});
