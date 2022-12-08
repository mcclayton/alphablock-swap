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

type WordGrid = Nullable<string>[][];

const EMPTY_GRID: WordGrid = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

const ATTEMPT_LIMIT = 1300;

// TODO: Remove xyst from the list, but just know that removing this means there are no
// words begining with 'x' so the alphabetic-based indexing will no longer work.

export class SolutionBuilder {
  dividedWordList: string[][] = [];

  getGridSolution() {
    return SolutionBuilder.getNewWordGrid();
  }

  static getNewWordGrid(): WordGrid {
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
      debugger;
      switch (stage) {
        case 1:
          /**
           * Stage One
           */

          const randomLetterIndex = INDEX_MAP[randomInt(INDEX_MAP.length - 1)];

          index = randomInt(GROUPED_WORD_LIST[randomLetterIndex].length - 1);
          word = GROUPED_WORD_LIST[randomLetterIndex][index];

          for (let j = 0; j < 4; j++) {
            wordGrid[0][j] = word.charAt(j);
          }
        case 2:
          /**
           * Stage Two
           */

          // TODO: Verify logic of this line
          index1 = randomInt(
            GROUPED_WORD_LIST[(wordGrid[0][0]?.charCodeAt(0) || 0) - 97]
              .length - 1,
          );
          word1 =
            GROUPED_WORD_LIST[(wordGrid[0][0]?.charCodeAt(0) || 0) - 97][
              index1
            ];

          // Try to reduce chance of duplicate words
          if (word1 === word && attempts < ATTEMPT_LIMIT) {
            attempts++;
            stage = 1;
            break;
          }

          for (let i = 0; i < 4; i++) {
            wordGrid[i][0] = word1.charAt(i);
          }
        case 3:
          /**
           * Stage Three
           */

          index2 = randomInt(
            GROUPED_WORD_LIST[(wordGrid[0][1]?.charCodeAt(0) || 0) - 97]
              .length - 1,
          );
          if (index2 == -1) {
            // Backtrack
            stage = 1;
            break;
          }

          word2 =
            GROUPED_WORD_LIST[(wordGrid[0][1]?.charCodeAt(0) || 0) - 97][
              index2
            ];

          for (let i = 0; i < 4; i++) {
            wordGrid[i][1] = word2.charAt(i);
          }

        case 4:
          /**
           * Stage Four
           */

          index3 = binarySearch(
            (wordGrid[1][0] || '') + (wordGrid[1][1] || ''),
            SOLUTION_LIST,
            index3 + 1,
            SOLUTION_LIST.length - 1,
          );

          if (index3 == -1) {
            // Backtrack
            stage = 1;
            break;
          }

          word3 = SOLUTION_LIST[index3];

          // Try to reduce chance of duplicate words
          if (word3 === word2 && attempts < ATTEMPT_LIMIT) {
            attempts++;
            stage = 3;
            break;
          }

          for (let i = 0; i < 4; i++) {
            wordGrid[1][i] = word3.charAt(i);
          }

        case 5:
          /**
           * Stage Five
           */

          index4 = binarySearch(
            (wordGrid[0][2] || '') + (wordGrid[1][2] || ''),
            SOLUTION_LIST,
            index4 + 1,
            SOLUTION_LIST.length - 1,
          );

          if (index4 == -1) {
            // Backtrack
            stage = 4;
            break;
          }

          word4 = SOLUTION_LIST[index4];
          for (let i = 0; i < 4; i++) {
            wordGrid[i][2] = word4.charAt(i);
          }

        case 6:
          /**
           * Stage Six
           */

          index5 = binarySearch(
            (wordGrid[2][0] || '') +
              (wordGrid[2][1] || '') +
              (wordGrid[2][2] || ''),
            SOLUTION_LIST,
            index5 + 1,
            SOLUTION_LIST.length - 1,
          );

          if (index5 == -1) {
            // Backtrack
            stage = 5;
            break;
          }

          word5 = SOLUTION_LIST[index5];
          for (let i = 0; i < 4; i++) {
            wordGrid[2][i] = word5.charAt(i);
          }

        case 7:
          /**
           * Stage Seven
           */

          index6 = binarySearch(
            (wordGrid[0][3] || '') +
              (wordGrid[1][3] || '') +
              (wordGrid[2][3] || ''),
            SOLUTION_LIST,
            index6 + 1,
            SOLUTION_LIST.length - 1,
          );

          if (index6 == -1) {
            // Backtrack

            stage = 6;
            break;
          }

          word6 = SOLUTION_LIST[index6];
          for (let i = 0; i < 4; i++) {
            wordGrid[i][3] = word6.charAt(i);
          }
        case 8:
          /**
           * Stage Eight
           * Check if bottom row is actual word
           */

          index7 = binarySearch(
            (wordGrid[3][0] || '') +
              (wordGrid[3][1] || '') +
              (wordGrid[3][2] || '') +
              (wordGrid[3][3] || ''),
            SOLUTION_LIST,
            0,
            SOLUTION_LIST.length - 1,
          );

          if (index7 == -1) {
            // Backtrack

            stage = 7;
            break;
          }

          word7 = SOLUTION_LIST[index7];
          for (let i = 0; i < 4; i++) {
            wordGrid[3][i] = word7.charAt(i);
          }

          /*
           * Test to see number of attempts used
           * for(int i=0; i<Integer.toString(attempts).length(); i++)
           * {
           * wordGrid[3][i] = Integer.toString(attempts).charAt(i);
           * }
           */

          // Successfully found solution grid, return grid
          return wordGrid;
        default:
          console.error(`Unexpected stage: ${stage}`);
          break;
      }
    }

    window.alert('Too many attempts! Failed to generate puzzle');
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
