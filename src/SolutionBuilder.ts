/* eslint-disable */
// @ts-nocheck
import cloneDeep from 'lodash/cloneDeep';
import groupBy from 'lodash/groupBy';

import { SOLUTION_LIST } from './solutionList.ts';

const GROUPED_WORD_LIST = getGroupedWordList(SOLUTION_LIST);

const INDEX_MAP = [
  // Exclude index 23 (which corresponds to the letter 'X')
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 24, 25,
];

const EMPTY_GRID: (string | null)[][] = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

// TODO: Remove xyst from the list, but just know that removing this means there are no
// words begining with 'x' so the alphabetic-based indexing will no longer work.

export class SolutionBuilder {
  wordGrid: Nullable<string>[][];
  dividedWordList: string[][] = [];

  index = -1;
  index1 = -1;
  index2 = -1;
  index3 = -1;
  index4 = -1;
  index5 = -1;
  index6 = -1;
  index7 = -1; //Used in setWordGrid
  word: Nullable<string> = null;
  word1: Nullable<string> = null;
  word2: Nullable<string> = null;
  word3: Nullable<string> = null;
  word4: Nullable<string> = null;
  word5: Nullable<string> = null;
  word6: Nullable<string> = null;
  word7: Nullable<string> = null; //Used in setWordGrid
  attempts = 0;

  getGridSolution() {
    this.wordGrid = cloneDeep(EMPTY_GRID);
    let stage: number = 1;
    while ((stage = this.setWordGrid(stage)) !== 0);

    return this.wordGrid;
  }

  setWordGrid(stage: number): number {
    const ATTEMPT_LIMIT = 1300;

    switch (stage) {
      case 1:
        /**
         * Stage One
         */

        this.word = SOLUTION_LIST[randomInt(SOLUTION_LIST.length - 1)];

        const randomLetterIndex = INDEX_MAP[randomInt(INDEX_MAP.length - 1)];

        this.index = randomInt(GROUPED_WORD_LIST[randomLetterIndex].length - 1);
        this.word = GROUPED_WORD_LIST[randomLetterIndex][this.index];

        for (let j = 0; j < 4; j++) {
          this.wordGrid[0][j] = this.word.charAt(j);
        }

      case 2:
        /**
         * Stage Two
         */

        // TODO: Verify logic of this line
        this.index1 = randomInt(
          GROUPED_WORD_LIST[(this.wordGrid[0][0]?.charCodeAt(0) || 0) - 97]
            .length - 1,
        );
        this.word1 =
          GROUPED_WORD_LIST[(this.wordGrid[0][0]?.charCodeAt(0) || 0) - 97][
            this.index1
          ];

        // Try to reduce chance of duplicate words
        if (this.word1 === this.word && this.attempts < ATTEMPT_LIMIT) {
          this.attempts++;
          return 1;
        }

        for (let i = 0; i < 4; i++) {
          this.wordGrid[i][0] = this.word1.charAt(i);
        }

      case 3:
        /**
         * Stage Three
         */

        this.index2 = randomInt(
          GROUPED_WORD_LIST[(this.wordGrid[0][1]?.charCodeAt(0) || 0) - 97]
            .length - 1,
        );
        if (this.index2 == -1) {
          // Backtrack
          return 1;
        }

        this.word2 =
          GROUPED_WORD_LIST[(this.wordGrid[0][1]?.charCodeAt(0) || 0) - 97][
            this.index2
          ];

        for (let i = 0; i < 4; i++) {
          this.wordGrid[i][1] = this.word2.charAt(i);
        }

      case 4:
        /**
         * Stage Four
         */

        this.index3 = binarySearch(
          (this.wordGrid[1][0] || '') + (this.wordGrid[1][1] || ''),
          SOLUTION_LIST,
          this.index3 + 1,
          SOLUTION_LIST.length - 1,
        );

        if (this.index3 == -1) {
          // Backtrack
          return 1;
        }

        this.word3 = SOLUTION_LIST[this.index3];

        // Try to reduce chance of duplicate words
        if (this.word3 === this.word2 && this.attempts < ATTEMPT_LIMIT) {
          this.attempts++;
          return 3;
        }

        for (let i = 0; i < 4; i++) {
          this.wordGrid[1][i] = this.word3.charAt(i);
        }

      case 5:
        /**
         * Stage Five
         */

        this.index4 = binarySearch(
          (this.wordGrid[0][2] || '') + (this.wordGrid[1][2] || ''),
          SOLUTION_LIST,
          this.index4 + 1,
          SOLUTION_LIST.length - 1,
        );

        if (this.index4 == -1) {
          // Backtrack
          return 4;
        }

        this.word4 = SOLUTION_LIST[this.index4];
        for (let i = 0; i < 4; i++) {
          this.wordGrid[i][2] = this.word4.charAt(i);
        }

      case 6:
        /**
         * Stage Six
         */

        this.index5 = binarySearch(
          (this.wordGrid[2][0] || '') +
            (this.wordGrid[2][1] || '') +
            (this.wordGrid[2][2] || ''),
          SOLUTION_LIST,
          this.index5 + 1,
          SOLUTION_LIST.length - 1,
        );

        if (this.index5 == -1) {
          // Backtrack
          return 5;
        }

        this.word5 = SOLUTION_LIST[this.index5];
        for (let i = 0; i < 4; i++) {
          this.wordGrid[2][i] = this.word5.charAt(i);
        }

      case 7:
        /**
         * Stage Seven
         */

        this.index6 = binarySearch(
          (this.wordGrid[0][3] || '') +
            (this.wordGrid[1][3] || '') +
            (this.wordGrid[2][3] || ''),
          SOLUTION_LIST,
          this.index6 + 1,
          SOLUTION_LIST.length - 1,
        );

        if (this.index6 == -1) {
          // Backtrack
          return 6;
        }

        this.word6 = SOLUTION_LIST[this.index6];
        for (let i = 0; i < 4; i++) {
          this.wordGrid[i][3] = this.word6.charAt(i);
        }

      case 8:
        /**
         * Stage Eight
         * Check if bottom row is actual word
         */

        this.index7 = binarySearch(
          (this.wordGrid[3][0] || '') +
            (this.wordGrid[3][1] || '') +
            (this.wordGrid[3][2] || '') +
            (this.wordGrid[3][3] || ''),
          SOLUTION_LIST,
          0,
          SOLUTION_LIST.length - 1,
        );

        if (this.index7 == -1) {
          // Backtrack
          return 7;
        }

        this.word7 = SOLUTION_LIST[this.index7];
        for (let i = 0; i < 4; i++) {
          this.wordGrid[3][i] = this.word7.charAt(i);
        }

        /*
         * //Test to see number of attempts used
         * for(int i=0; i<Integer.toString(attempts).length(); i++)
         * {
         * wordGrid[3][i] = Integer.toString(attempts).charAt(i);
         * }
         */

        break;

      default:
        console.error(`Unexpected stage: ${stage}`);
        break;
    }

    // Successfully found solution grid, reset values and return 0.
    this.word = null;
    this.word1 = null;
    this.word2 = null;
    this.word3 = null;
    this.word4 = null;
    this.word5 = null;
    this.word6 = null;
    this.word7 = null;
    this.attempts = 0;
    return 0;
  }
}

/**
 * Gets an array of words grouped by starting letter.
 */
function getGroupedWordList(wordList: string[]) {
  // TODO: Clean this up by just having this be the map version
  // i.e. { 'a': ['apple', ...] }
  const groupedObj = groupBy(wordList, (val) => val[0]);
  const sortedKeys = Object.keys(groupedObj).sort();
  return sortedKeys.reduce((acc, curr) => {
    return [...acc, groupedObj[curr]];
  }, [] as string[][]);
}

function randomInt(max: number) {
  // min and max included
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function binarySearch(
  key: string,
  arrayList: string[],
  minIndex = 0,
  maxIndex: number,
): number {
  let midIndex: number;
  while (maxIndex >= minIndex) {
    midIndex = (minIndex & maxIndex) + ((minIndex ^ maxIndex) >> 1);

    if (arrayList[midIndex].startsWith(key)) return midIndex;
    else if (arrayList[midIndex].localeCompare(key) < 0)
      minIndex = midIndex + 1;
    else if (arrayList[midIndex].localeCompare(key) > 0)
      maxIndex = midIndex - 1;
    else return midIndex;
  }
  return -1;
}

console.log(new SolutionBuilder().getGridSolution());
