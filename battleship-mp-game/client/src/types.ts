// src/types.ts

export type Ship = {
    id: string;
    length: number;
    cells: Array<{ x: number; y: number }>;
  };
  
  export type BoardCell = {
    hasShip: boolean;
    isHit: boolean;
  };
  
  export type Board = BoardCell[][];
  