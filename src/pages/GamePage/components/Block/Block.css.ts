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
  '@media': {
    'screen and (max-width: 600px)': {
      fontSize: '30px',
      height: '70px',
      width: '70px',
    },
    'screen and (min-width: 600px)': {
      fontSize: '40px',
      height: '85px',
      width: '85px',
    },
    'screen and (min-width: 768px)': {
      fontSize: '50px',
      height: '100px',
      width: '100px',
    },
    'screen and (min-width: 1200px)': {
      fontSize: '55px',
      height: '110px',
      width: '110px',
    },
  },
});

export const block = styleVariants({
  default: [baseBlock],
  selected: [
    baseBlock,
    {
      background: BLOCK_BG_SELECTED,
      color: BLOCK_FG_SELECTED,
      borderBottom: `6px solid ${BLOCK_FG}`,
    },
  ],
  moveable: [
    baseBlock,
    {
      selectors: {
        '&:hover': {
          border: `3px solid ${BLOCK_FG}`,
          borderBottom: `6px solid ${BLOCK_FG}`,
        },
      },
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
  highlight: [
    baseBlock,
    {
      color: '#ffbf00',
      textShadow: '#a67c00 2px 2px 3px',
    },
  ],
});

export const shine = styleVariants({
  base: {
    height: '8px',
    background: 'white',
    borderRadius: '6px',
    width: '65%',
    display: 'flex',
    justifyContent: 'center',
    opacity: 0.7,
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
