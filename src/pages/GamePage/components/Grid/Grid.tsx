import { WordGrid } from 'builder';
import { ReactChild, useEffect, useState } from 'react';

import { Block } from '../Block';
import { grid, gridWrapper, row as rowClass } from './Grid.css';

type Coordinate = {
  x: number;
  y: number;
};

type Props = {
  initBoard: WordGrid;
};

export function Grid({ initBoard }: Props) {
  const [board, setBoard] = useState(initBoard);
  // Update to reflect new board
  useEffect(() => {
    setBoard(initBoard);
  }, [initBoard]);

  const [selected, setSelected] = useState<Nullable<Coordinate>>(null);
  const [selectedTwo, setSelectedTwo] = useState<Nullable<Coordinate>>(null);

  function handleSelection(val: string, coord: Coordinate) {
    if (selected && !selectedTwo) {
      setSelectedTwo(coord);

      // Already a selection, so swap them
      const valA = board[selected.x][selected.y].val;
      const valB = board[coord.x][coord.y].val;

      // Swap
      board[selected.x][selected.y].val = valB;
      board[coord.x][coord.y].val = valA;

      setTimeout(() => {
        setSelected(null);
        setSelectedTwo(null);
      }, 100);
    } else {
      // No selection, select coord
      setSelected(coord);
    }
  }

  return (
    <div className={grid}>
      <div className={gridWrapper}>
        {board.map((row, rowIdx) => (
          <Row key={rowIdx}>
            {row.map((block, colIdx) => (
              <Block
                immovable={Boolean(block.immovable)}
                onClick={(val, x, y) => handleSelection(val, { x, y })}
                key={`${rowIdx}-${colIdx}`}
                val={block.val}
                x={rowIdx}
                y={colIdx}
                selected={
                  (rowIdx === selected?.x && colIdx === selected?.y) ||
                  (rowIdx === selectedTwo?.x && colIdx === selectedTwo?.y)
                }
              />
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
}

function Row({ children }: { children: ReactChild[] }) {
  return <div className={rowClass}>{children}</div>;
}
