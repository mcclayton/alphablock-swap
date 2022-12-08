import cx from 'classnames';

import { block, highlight } from './Block.css';

type Props = {
  val: Nullable<string>;
  x: number;
  y: number;
  selected?: boolean;
  immovable: boolean;
  onClick?: (val: string, x: number, y: number) => void;
};

export function Block({ val, x, y, selected, immovable, onClick }: Props) {
  const value = val ? val.toUpperCase() : '-';
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cx(block.default, {
        [block.selected]: selected,
        [block.immovable]: immovable,
      })}
      onClick={() => !immovable && onClick?.(value, x, y)}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!immovable && (
          <div
            className={cx(highlight.base, {
              [highlight.selected]: selected,
            })}
          />
        )}
        <div>{value}</div>
      </div>
    </div>
  );
}
