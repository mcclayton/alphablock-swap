import { style } from '@vanilla-extract/css';
import { flexCenter } from 'general.css';

export const buttonContainer = style([
  flexCenter.column,
  {
    paddingTop: '10px',
  },
]);
