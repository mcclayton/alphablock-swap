import { SolutionBuilder } from 'SolutionBuilder';
import cx from 'classnames';
import { useState } from 'react';

import { flexCenter, page } from './GamePage.css';
import { Grid } from './components/Grid/Grid';

const sb = new SolutionBuilder();

export function GamePage() {
  const [solution, setSolution] = useState(sb.getGridSolution());

  function getNewSolution() {
    setSolution(sb.getGridSolution());
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
      </div>
    </div>
  );
}
