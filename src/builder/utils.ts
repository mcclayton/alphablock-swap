import groupBy from 'lodash/groupBy';

import { Grid } from './types';

/**
 * Gets an array of words grouped by starting letter.
 */
export function getGroupedWordList(wordList: string[]) {
  // TODO: Clean this up by just having this be the map version
  // i.e. { 'a': ['apple', ...] }
  const groupedObj = groupBy(wordList, (val) => val[0]);
  const sortedKeys = Object.keys(groupedObj).sort();
  return sortedKeys.reduce(
    (acc, curr) => [...acc, groupedObj[curr]],
    [] as Grid<string>,
  );
}

export function randomInt(max: number) {
  // min and max included
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* eslint-disable */
export function binarySearch(
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
/* eslint-enable */
