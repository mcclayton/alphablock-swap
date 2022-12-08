import { SolutionBuilder } from 'SolutionBuilder';
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
        <Grid initBoard={solution} />
        <button type="button" onClick={getNewSolution}>
          New
        </button>
        <button type="button" onClick={shuffle}>
          Shuffle
        </button>
      </div>
    </div>
  );
}
