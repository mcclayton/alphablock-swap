import cx from 'classnames';

import { block, letterContainer, shine } from './Block.css';

export enum Highlight {
  Winner = 'winner',
  Match = 'match',
  None = 'none',
}

type Props = {
  val: Nullable<string>;
  x: number;
  y: number;
  selected?: boolean;
  immovable: boolean;
  highlight: Highlight;
  onClick?: (val: string, x: number, y: number) => void;
};

export function Block({
  val,
  x,
  y,
  selected,
  immovable,
  onClick,
  highlight,
}: Props) {
  const value = val ? val.toUpperCase() : '-';
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cx(block.default, {
        [block.selected]: selected,
        [block.moveable]: !immovable,
        [block.immovable]: immovable,
        [block.highlight]: highlight === Highlight.Match,
        [block.winner]: highlight === Highlight.Winner,
      })}
      onClick={() => !immovable && onClick?.(value, x, y)}
    >
      <div className={letterContainer}>
        {!immovable && (
          <div
            className={cx(shine.base, {
              [shine.selected]: selected,
            })}
          />
        )}
        <div>{value}</div>
      </div>
    </div>
  );
}
