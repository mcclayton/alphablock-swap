import { style, styleVariants } from '@vanilla-extract/css';
import {
  BLOCK_BG,
  BLOCK_BG_SELECTED,
  BLOCK_FG,
  BLOCK_FG_SELECTED,
  SPACING,
} from 'theme.css';

const baseBlock = style({
  background: BLOCK_BG,
  color: BLOCK_FG,
  height: '100px',
  width: '100px',
  fontSize: '50px',
  fontWeight: 'bold',
  margin: SPACING,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  borderRadius: '8px',
  border: `3px solid ${BLOCK_FG}`,
  borderBottom: `8px solid ${BLOCK_FG}`,
  cursor: 'pointer',
});

export const block = styleVariants({
  default: [baseBlock],
  selected: [
    baseBlock,
    {
      background: BLOCK_BG_SELECTED,
      color: BLOCK_FG_SELECTED,
    },
  ],
  immovable: [
    baseBlock,
    {
      background: 'none',
      color: '#5c5b5b',
      border: 'none',
      cursor: 'default',
    },
  ],
});

export const highlight = styleVariants({
  base: {
    height: '8px',
    background: 'white',
    borderRadius: '6px',
    width: '65%',
    display: 'flex',
    justifyContent: 'center',
  },
  selected: {
    opacity: 0.3,
  },
});

export const letterContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
