import { ReactChild } from 'react';

import { grid, gridWrapper } from './Grid.css';

type Props = {
  children: ReactChild[];
};

export function Grid({ children }: Props) {
  return (
    <div className={grid}>
      <div className={gridWrapper}>{children}</div>
    </div>
  );
}
