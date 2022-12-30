import { Difficulty, SolutionBuilder } from 'builder';
import cx from 'classnames';
import { GameBoard } from 'components/GameBoard';
import { Page } from 'components/Page';
import { button, flexCenter } from 'general.css';
import { useState } from 'react';

import { buttonContainer } from './GamePage.css';

const sb = new SolutionBuilder();

export function GamePage() {
  const [solution, setSolution] = useState(sb.newSolution(sb.difficulty));

  function getNewSolution() {
    setSolution(sb.newSolution(sb.difficulty));
  }

  return (
    <Page>
      <GameBoard initBoard={solution} />
      <div className={buttonContainer}>
        <button
          className={cx(button.base)}
          type="button"
          onClick={getNewSolution}
        >
          New
        </button>
        <div className={flexCenter.row}>
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
    </Page>
  );
}
