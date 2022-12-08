import { Difficulty, Grid } from './types';

export const EMPTY_GRID: Grid<{ val: null }> = [
  [{ val: null }, { val: null }, { val: null }, { val: null }],
  [{ val: null }, { val: null }, { val: null }, { val: null }],
  [{ val: null }, { val: null }, { val: null }, { val: null }],
  [{ val: null }, { val: null }, { val: null }, { val: null }],
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
