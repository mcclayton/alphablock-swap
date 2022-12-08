import { Difficulty, SolutionBuilder } from 'SolutionBuilder';
import cx from 'classnames';
import { useState } from 'react';

import { flexCenter, page } from './GamePage.css';
import { Grid } from './components/Grid/Grid';

const sb = new SolutionBuilder();

export function GamePage() {
  const [solution, setSolution] = useState(sb.newSolution());

  function getNewSolution() {
    setSolution(sb.newSolution());
  }

  function shuffle() {
    setSolution(sb.shuffle(solution));
  }

  return (
    <div className={cx(page, flexCenter.row)}>
      <div
        className={flexCenter.column}
        style={{
          flexDirection: 'column',
        }}
      >
        <Grid initBoard={solution} difficulty={sb.difficulty} />
        <button type="button" onClick={getNewSolution}>
          New
        </button>
        <button type="button" onClick={shuffle}>
          Shuffle
        </button>
        <div style={{ display: 'flex' }}>
          <button
            type="button"
            onClick={() => sb.setDifficulty(Difficulty.Easy)}
          >
            Easy
          </button>
          <button
            type="button"
            onClick={() => sb.setDifficulty(Difficulty.Medium)}
          >
            Medium
          </button>
          <button
            type="button"
            onClick={() => sb.setDifficulty(Difficulty.Hard)}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}
