import cx from 'classnames';
import { flexCenter } from 'general.css';
import { ReactNode } from 'react';

import { boardContainer, header, page } from './Page.css';

type Props = { children: ReactNode };

export function Page({ children }: Props) {
  return (
    <div className={cx(page, flexCenter.column)}>
      <div className={boardContainer}>
        <h1 className={header}>BlockWords</h1>
        <div className={flexCenter.row}>
          <div className={flexCenter.column}>{children}</div>
        </div>
      </div>
    </div>
  );
}
