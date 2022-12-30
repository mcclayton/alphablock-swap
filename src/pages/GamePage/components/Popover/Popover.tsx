import { ReactNode } from 'react';
import { ArrowContainer, Popover as TinyPopover } from 'react-tiny-popover';

export enum Highlight {
  Double = 'double',
  Single = 'single',
  None = 'none',
}

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
        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor="white"
          arrowSize={10}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {contents}
          </div>
        </ArrowContainer>
      )}
    >
      {children}
    </TinyPopover>
  );
}
