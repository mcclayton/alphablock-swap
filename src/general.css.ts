import { style, styleVariants } from '@vanilla-extract/css';
import { GRID_CONTAINER_BORDER, PAGE_BG, SPACING } from 'theme.css';

export const baseFlexCenter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const flexCenter = styleVariants({
  row: [baseFlexCenter, { flexDirection: 'row' }],
  column: [baseFlexCenter, { flexDirection: 'column' }],
});

export const button = styleVariants({
  base: {
    padding: '10px',
    background: PAGE_BG,
    color: GRID_CONTAINER_BORDER,
    fontWeight: 'bold',
    margin: SPACING,
    borderRadius: '8px',
    border: `2px solid ${GRID_CONTAINER_BORDER}`,
    borderBottom: `4px solid ${GRID_CONTAINER_BORDER}`,
    selectors: {
      '&:focus': {
        borderBottom: `2px solid ${GRID_CONTAINER_BORDER}`,
      },
    },
  },
  selected: {
    borderBottom: `2px solid #{GRID_CONTAINER_BORDER}`,
  },
});
