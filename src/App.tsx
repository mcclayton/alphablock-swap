import 'index.scss';
import { useState } from 'react';

import { SolutionBuilder } from './SolutionBuilder';

export function App() {
  const [sb] = useState(new SolutionBuilder());
  const [solution, setSolution] = useState(sb.getGridSolution());

  function getNewSolution() {
    setSolution(sb.getGridSolution());
  }

  return (
    <>
      <div>
        {solution.map((row, idx) => (
          <div key={idx}>{JSON.stringify(row)}</div>
        ))}
      </div>
      <button type="button" onClick={getNewSolution}>
        New
      </button>
    </>
  );
}
