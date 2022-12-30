import { ReactNode } from 'react';
import { ArrowContainer, Popover as TinyPopover } from 'react-tiny-popover';

import { content } from './Popover.css';

type Props = {
  children: JSX.Element & ReactNode;
  contents: ReactNode;
  isOpen?: boolean;
};

export function Popover({ children, contents, isOpen = false }: Props) {
  return (
    <TinyPopover
      isOpen={isOpen}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor="white"
          arrowSize={10}
        >
          <div className={content}>{contents}</div>
        </ArrowContainer>
      )}
    >
      {children}
    </TinyPopover>
  );
}
