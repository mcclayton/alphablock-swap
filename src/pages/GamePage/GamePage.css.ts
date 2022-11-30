import { style, styleVariants } from '@vanilla-extract/css';

export const page = style({
  width: '100%',
  height: '100%',
});

export const baseFlexCenter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const flexCenter = styleVariants({
  row: [baseFlexCenter, { flexDirection: 'row' }],
  column: [baseFlexCenter, { flexDirection: 'column' }],
});
