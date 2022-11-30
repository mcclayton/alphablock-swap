import { style } from '@vanilla-extract/css';

import { GRID_BORDER } from '../Grid/Grid.css';

export const block = style({
  background: 'white',
  height: '100px',
  width: '100px',
  fontSize: '50px',
  fontWeight: 'bold',
  margin: GRID_BORDER,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
