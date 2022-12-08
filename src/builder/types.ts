export enum Difficulty {
  Easy = 1,
  Medium = 2,
  Hard = 3,
}

export type Block = {
  val: Nullable<string>;
  immovable?: boolean;
  match: {
    column?: boolean;
    row?: boolean;
  };
};

export type Grid<T> = T[][];
export type WordGrid = Grid<Block>;
