import { Difficulty, Grid, WordGrid } from './types';
import { block } from './utils';

export const EMPTY_GRID: WordGrid = [
  [block(), block(), block(), block()],
  [block(), block(), block(), block()],
  [block(), block(), block(), block()],
  [block(), block(), block(), block()],
];

export const MOVABLE_BLOCKS_MAP: Record<
  Difficulty,
  Grid<{ immovable: boolean }>
> = {
  [Difficulty.Easy]: [
    [
      { immovable: true },
      { immovable: false },
      { immovable: false },
      { immovable: true },
    ],
    [
      { immovable: false },
      { immovable: true },
      { immovable: true },
      { immovable: false },
    ],
    [
      { immovable: false },
      { immovable: true },
      { immovable: true },
      { immovable: false },
    ],
    [
      { immovable: true },
      { immovable: false },
      { immovable: false },
      { immovable: true },
    ],
  ],
  [Difficulty.Medium]: [
    [
      { immovable: true },
      { immovable: false },
      { immovable: false },
      { immovable: true },
    ],
    [
      { immovable: false },
      { immovable: false },
      { immovable: false },
      { immovable: false },
    ],
    [
      { immovable: false },
      { immovable: false },
      { immovable: false },
      { immovable: false },
    ],
    [
      { immovable: true },
      { immovable: false },
      { immovable: false },
      { immovable: true },
    ],
  ],
  [Difficulty.Hard]: [
    [
      { immovable: false },
      { immovable: false },
      { immovable: false },
      { immovable: false },
    ],
    [
      { immovable: false },
      { immovable: false },
      { immovable: false },
      { immovable: false },
    ],
    [
      { immovable: false },
      { immovable: false },
      { immovable: false },
      { immovable: false },
    ],
    [
      { immovable: false },
      { immovable: false },
      { immovable: false },
      { immovable: false },
    ],
  ],
};
