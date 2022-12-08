import cx from 'classnames';

import { block } from './Block.css';

type Props = {
  val: Nullable<string>;
  x: number;
  y: number;
  selected?: boolean;
  movable: boolean;
  onClick?: (val: string, x: number, y: number) => void;
};

export function Block({ val, x, y, selected, movable, onClick }: Props) {
  const value = val ? val.toUpperCase() : '-';
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cx(block.default, {
        [block.selected]: selected,
        [block.immovable]: !movable,
      })}
      onClick={() => movable && onClick?.(value, x, y)}
    >
      {value}
    </div>
  );
}
