import { SolutionBuilder } from 'SolutionBuilder';
import { useState } from 'react';

import { Grid } from './components/Grid/Grid';

export function GamePage() {
  const [sb] = useState(new SolutionBuilder());
  const [solution, setSolution] = useState(sb.getGridSolution());

  function getNewSolution() {
    setSolution(sb.getGridSolution());
  }

  return (
    <>
      <Grid initBoard={solution} />
      <button type="button" onClick={getNewSolution}>
        New
      </button>
    </>
  );
}
