import { style, styleVariants } from '@vanilla-extract/css';
import {
  BLOCK_BG,
  BLOCK_BG_SELECTED,
  BLOCK_FG,
  BLOCK_FG_SELECTED,
  BORDER_WIDTH,
} from 'theme.css';

const baseBlock = style({
  background: BLOCK_BG,
  color: BLOCK_FG,
  height: '100px',
  width: '100px',
  fontSize: '50px',
  fontWeight: 'bold',
  margin: BORDER_WIDTH,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
});

export const block = styleVariants({
  default: [baseBlock],
  selected: [
    baseBlock,
    { background: BLOCK_BG_SELECTED, color: BLOCK_FG_SELECTED },
  ],
});
