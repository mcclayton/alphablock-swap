import { Difficulty, SolutionBuilder } from 'builder';
import cx from 'classnames';
import { useState } from 'react';

import {
  boardContainer,
  button,
  flexCenter,
  header,
  page,
} from './GamePage.css';
import { Grid } from './components/Grid/Grid';

const sb = new SolutionBuilder();

export function GamePage() {
  const [solution, setSolution] = useState(
    sb.shuffle(sb.newSolution(sb.difficulty)),
  );

  function getNewSolution() {
    setSolution(sb.shuffle(sb.newSolution(sb.difficulty)));
  }

  return (
    <div className={cx(page, flexCenter.column)}>
      <div className={boardContainer}>
        <h1 className={header}>BlockWords</h1>
        <div className={flexCenter.row}>
          <div
            className={flexCenter.column}
            style={{
              flexDirection: 'column',
            }}
          >
            <Grid initBoard={solution} />
            <button
              className={cx(button.base)}
              type="button"
              onClick={getNewSolution}
            >
              New
            </button>
            <div style={{ display: 'flex' }}>
              <button
                className={cx(button.base, {
                  [button.selected]: sb.difficulty === Difficulty.Easy,
                })}
                type="button"
                onClick={() => {
                  sb.setDifficulty(Difficulty.Easy);
                  getNewSolution();
                }}
              >
                Easy
              </button>
              <button
                className={cx(button.base, {
                  [button.selected]: sb.difficulty === Difficulty.Medium,
                })}
                type="button"
                onClick={() => {
                  sb.setDifficulty(Difficulty.Medium);
                  getNewSolution();
                }}
              >
                Medium
              </button>
              <button
                className={cx(button.base, {
                  [button.selected]: sb.difficulty === Difficulty.Hard,
                })}
                type="button"
                onClick={() => {
                  sb.setDifficulty(Difficulty.Hard);
                  getNewSolution();
                }}
              >
                Hard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
