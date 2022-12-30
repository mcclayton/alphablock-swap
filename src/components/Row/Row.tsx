import { ReactChild } from 'react';

import { row } from './Row.css';

type Props = {
  children: ReactChild[];
};

export function Row({ children }: Props) {
  return <div className={row}>{children}</div>;
}
