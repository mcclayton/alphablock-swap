import { block } from './Block.css';

type Props = {
  val: Nullable<string>;
  x: number;
  y: number;
  selected?: boolean;
  onClick?: (val: string, x: number, y: number) => void;
};

export function Block({ val, x, y, selected, onClick }: Props) {
  const value = val ? val.toUpperCase() : '-';
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={block}
      style={selected ? { background: 'yellow' } : {}}
      onClick={() => onClick?.(value, x, y)}
    >
      {value}
    </div>
  );
}
