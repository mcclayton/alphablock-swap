/* eslint-disable */
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

import { CHECK_LIST } from '../checkList';
import { SOLUTION_LIST } from '../solutionList';
import { EMPTY_GRID, MOVABLE_BLOCKS_MAP } from './constants';
import { Difficulty, WordGrid } from './types';
import { binarySearch, getGroupedWordList, randomInt } from './utils';

const GROUPED_WORD_LIST = getGroupedWordList(SOLUTION_LIST);

export const INDEX_MAP = [
  // Exclude index 23 (which corresponds to the letter 'X')
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 24, 25,
];

const DUPLICATE_WORD_ATTEMPT_LIMIT = 1300;

// TODO: Remove xyst from the list, but just know that removing this means there are no
// words begining with 'x' so the alphabetic-based indexing will no longer work.

export class SolutionBuilder {
  _difficulty: Difficulty;

  constructor() {
    this._difficulty = Difficulty.Easy;
  }

  get difficulty() {
    return this._difficulty;
  }

  setDifficulty(difficulty: Difficulty) {
    this._difficulty = difficulty;
  }

  newSolution(difficulty: Difficulty) {
    let shuffleAttempts = 0;
    let solution = getNewWordGrid(difficulty);
    while (highlightMatches(solution).match) {
      // Some grids are not shuffle-able, so we need to get a new
      // grid after too many attempts
      if (shuffleAttempts > 20) {
        shuffleAttempts = 0;
        solution = getNewWordGrid(difficulty);
      }
      solution = shuffleGrid(solution, difficulty);
      shuffleAttempts++;
    }
    return solution;
  }

  shuffle(solution: WordGrid) {
    return shuffleGrid(solution, this.difficulty);
  }
}

function shuffleGrid(grid: WordGrid, mode: Difficulty) {
  const shuffled = cloneDeep(grid);
  let randomNum1: number;
  let randomNum2: number;
  let char1: Nullable<string>;
  let char2: Nullable<string>;

  for (let i = 0; i < shuffled.length; i++) {
    for (let j = 0; j < shuffled[i].length; j++) {
      if (
        mode === Difficulty.Easy &&
        !(
          (i === 0 && j === 0) ||
          (i === 0 && j === 3) ||
          (i === 1 && j === 1) ||
          (i === 1 && j === 2) ||
          (i === 2 && j === 1) ||
          (i === 2 && j === 2) ||
          (i === 3 && j === 0) ||
          (i === 3 && j === 3)
        )
      ) {
        do {
          randomNum1 = randomInt(3);
          randomNum2 = randomInt(3);
        } while (
          (randomNum1 === 0 && randomNum2 === 0) ||
          (randomNum1 === 0 && randomNum2 === 3) ||
          (randomNum1 === 1 && randomNum2 === 1) ||
          (randomNum1 === 1 && randomNum2 === 2) ||
          (randomNum1 === 2 && randomNum2 === 1) ||
          (randomNum1 === 2 && randomNum2 === 2) ||
          (randomNum1 === 3 && randomNum2 === 0) ||
          (randomNum1 === 3 && randomNum2 === 3)
        );

        char1 = shuffled[i][j].val;
        char2 = shuffled[randomNum1][randomNum2].val;
        shuffled[i][j].val = char2;
        shuffled[randomNum1][randomNum2].val = char1;
      } else if (
        mode === Difficulty.Medium &&
        !(
          (i === 0 && j === 0) ||
          (i === 0 && j === 3) ||
          (i === 3 && j === 0) ||
          (i === 3 && j === 3)
        )
      ) {
        do {
          randomNum1 = randomInt(3);
          randomNum2 = randomInt(3);
        } while (
          (randomNum1 === 0 && randomNum2 === 0) ||
          (randomNum1 === 0 && randomNum2 === 3) ||
          (randomNum1 === 3 && randomNum2 === 0) ||
          (randomNum1 === 3 && randomNum2 === 3)
        );

        char1 = shuffled[i][j].val;
        char2 = shuffled[randomNum1][randomNum2].val;
        shuffled[i][j].val = char2;
        shuffled[randomNum1][randomNum2].val = char1;
      } else if (mode === Difficulty.Hard) {
        randomNum1 = randomInt(3);
        randomNum2 = randomInt(3);

        char1 = shuffled[i][j].val;
        char2 = shuffled[randomNum1][randomNum2].val;
        shuffled[i][j].val = char2;
        shuffled[randomNum1][randomNum2].val = char1;
      }
    }
  }

  return shuffled;
}

function getNewWordGrid(difficulty: Difficulty): WordGrid {
  const wordGrid = cloneDeep(EMPTY_GRID);
  let attempts = 0;
  let stage = 1;

  let index = -1;
  let index1 = -1;
  let index2 = -1;
  let index3 = -1;
  let index4 = -1;
  let index5 = -1;
  let index6 = -1;
  let index7 = -1;
  let word: Nullable<string> = null;
  let word1: Nullable<string> = null;
  let word2: Nullable<string> = null;
  let word3: Nullable<string> = null;
  let word4: Nullable<string> = null;
  let word5: Nullable<string> = null;
  let word6: Nullable<string> = null;
  let word7: Nullable<string> = null;

  while (stage !== 0) {
    switch (stage) {
      // @ts-ignore
      case 1:
        /**
         * Stage One
         */

        const randomLetterIndex = INDEX_MAP[randomInt(INDEX_MAP.length - 1)];

        index = randomInt(GROUPED_WORD_LIST[randomLetterIndex].length - 1);
        word = GROUPED_WORD_LIST[randomLetterIndex][index];

        for (let j = 0; j < 4; j++) {
          wordGrid[0][j].val = word.charAt(j);
        }
      // @ts-ignore
      case 2:
        /**
         * Stage Two
         */

        // TODO: Verify logic of this line
        index1 = randomInt(
          GROUPED_WORD_LIST[(wordGrid[0][0]?.val?.charCodeAt(0) || 0) - 97]
            .length - 1,
        );
        word1 =
          GROUPED_WORD_LIST[(wordGrid[0][0]?.val?.charCodeAt(0) || 0) - 97][
            index1
          ];

        // Try to reduce chance of duplicate words
        if (word1 === word && attempts < DUPLICATE_WORD_ATTEMPT_LIMIT) {
          attempts++;
          stage = 1;
          break;
        }

        for (let i = 0; i < 4; i++) {
          wordGrid[i][0].val = word1.charAt(i);
        }
      // @ts-ignore
      case 3:
        /**
         * Stage Three
         */

        index2 = randomInt(
          GROUPED_WORD_LIST[(wordGrid[0][1]?.val?.charCodeAt(0) || 0) - 97]
            .length - 1,
        );
        if (index2 === -1) {
          // Backtrack
          stage = 1;
          break;
        }

        word2 =
          GROUPED_WORD_LIST[(wordGrid[0][1]?.val?.charCodeAt(0) || 0) - 97][
            index2
          ];

        for (let i = 0; i < 4; i++) {
          wordGrid[i][1].val = word2.charAt(i);
        }
      // @ts-ignore
      case 4:
        /**
         * Stage Four
         */

        index3 = binarySearch(
          (wordGrid[1][0].val || '') + (wordGrid[1][1].val || ''),
          SOLUTION_LIST,
          index3 + 1,
          SOLUTION_LIST.length - 1,
        );

        if (index3 === -1) {
          // Backtrack
          stage = 1;
          break;
        }

        word3 = SOLUTION_LIST[index3];

        // Try to reduce chance of duplicate words
        if (word3 === word2 && attempts < DUPLICATE_WORD_ATTEMPT_LIMIT) {
          attempts++;
          stage = 3;
          break;
        }

        for (let i = 0; i < 4; i++) {
          wordGrid[1][i].val = word3.charAt(i);
        }
      // @ts-ignore
      case 5:
        /**
         * Stage Five
         */

        index4 = binarySearch(
          (wordGrid[0][2].val || '') + (wordGrid[1][2].val || ''),
          SOLUTION_LIST,
          index4 + 1,
          SOLUTION_LIST.length - 1,
        );

        if (index4 === -1) {
          // Backtrack
          stage = 4;
          break;
        }

        word4 = SOLUTION_LIST[index4];
        for (let i = 0; i < 4; i++) {
          wordGrid[i][2].val = word4.charAt(i);
        }
      // @ts-ignore
      case 6:
        /**
         * Stage Six
         */

        index5 = binarySearch(
          (wordGrid[2][0].val || '') +
            (wordGrid[2][1].val || '') +
            (wordGrid[2][2].val || ''),
          SOLUTION_LIST,
          index5 + 1,
          SOLUTION_LIST.length - 1,
        );

        if (index5 === -1) {
          // Backtrack
          stage = 5;
          break;
        }

        word5 = SOLUTION_LIST[index5];
        for (let i = 0; i < 4; i++) {
          wordGrid[2][i].val = word5.charAt(i);
        }
      // @ts-ignore
      case 7:
        /**
         * Stage Seven
         */

        index6 = binarySearch(
          (wordGrid[0][3].val || '') +
            (wordGrid[1][3].val || '') +
            (wordGrid[2][3].val || ''),
          SOLUTION_LIST,
          index6 + 1,
          SOLUTION_LIST.length - 1,
        );

        if (index6 === -1) {
          // Backtrack

          stage = 6;
          break;
        }

        word6 = SOLUTION_LIST[index6];
        for (let i = 0; i < 4; i++) {
          wordGrid[i][3].val = word6.charAt(i);
        }
      case 8:
        /**
         * Stage Eight
         * Check if bottom row is actual word
         */

        index7 = binarySearch(
          (wordGrid[3][0].val || '') +
            (wordGrid[3][1].val || '') +
            (wordGrid[3][2].val || '') +
            (wordGrid[3][3].val || ''),
          SOLUTION_LIST,
          0,
          SOLUTION_LIST.length - 1,
        );

        if (index7 === -1) {
          // Backtrack

          stage = 7;
          break;
        }

        word7 = SOLUTION_LIST[index7];
        for (let i = 0; i < 4; i++) {
          wordGrid[3][i].val = word7.charAt(i);
        }

        // Successfully found solution grid, return grid
        stage = 0;
        break;
      default:
        console.error(`Unexpected stage: ${stage}`);
        break;
    }
  }

  return merge(wordGrid, MOVABLE_BLOCKS_MAP[difficulty]);
}

export function highlightMatches(grid: WordGrid) {
  let match = false;
  const newGrid = cloneDeep(grid);

  // Reset matches
  newGrid.forEach((rows) =>
    rows.forEach((cell) => {
      cell.match.col = false;
      cell.match.row = false;
    }),
  );

  // TODO: Generate the row/column coordinate lists
  const rows = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
    [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
    ],
  ];

  const columns = [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
    [
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3],
    ],
  ];

  // TODO: consolidate row and col logic
  rows.forEach((rowCoords) => {
    const word = rowCoords.reduce(
      (acc, [x, y]) => `${acc}${grid[x][y].val}`,
      '',
    );

    const idx = binarySearch(word, CHECK_LIST, 0, CHECK_LIST.length - 1);

    const currMatch = idx !== -1;

    rowCoords.forEach(([x, y]) => {
      newGrid[x][y] = {
        ...newGrid[x][y],
        match: {
          ...newGrid[x][y].match,
          row: currMatch,
        },
      };
    });
    match = match || currMatch;
  });

  columns.forEach((colCoords) => {
    const word = colCoords.reduce(
      (acc, [x, y]) => `${acc}${grid[x][y].val}`,
      '',
    );

    const idx = binarySearch(word, CHECK_LIST, 0, CHECK_LIST.length - 1);

    const currMatch = idx !== -1;

    colCoords.forEach(([x, y]) => {
      newGrid[x][y] = {
        ...newGrid[x][y],
        match: {
          ...newGrid[x][y].match,
          col: currMatch,
        },
      };
    });
    match = match || currMatch;
  });

  return { grid: newGrid, match };
}

export function didWin(grid: WordGrid) {
  return grid.reduce(
    (acc, rows) =>
      acc &&
      rows.reduce(
        (acc, cell) => Boolean(acc && cell.match.row && cell.match.col),
        true,
      ),
    true,
  );
}
