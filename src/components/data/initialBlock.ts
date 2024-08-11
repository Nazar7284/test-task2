// components/data/initialBlocks.ts

export interface IBlock {
  id: number;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export const initialBlocks: IBlock[] = [
  {
    id: 1,
    content: "Block 1",
    x: 50,
    y: 50,
    width: 300,
    height: 100,
    zIndex: 1,
  },
  {
    id: 2,
    content: "Block 2",
    x: 400,
    y: 50,
    width: 300,
    height: 100,
    zIndex: 2,
  },
  {
    id: 3,
    content: "Block 3",
    x: 750,
    y: 50,
    width: 300,
    height: 100,
    zIndex: 3,
  },
  {
    id: 4,
    content: "Block 4",
    x: 50,
    y: 300,
    width: 300,
    height: 100,
    zIndex: 4,
  },
  {
    id: 5,
    content: "Block 5",
    x: 400,
    y: 300,
    width: 300,
    height: 100,
    zIndex: 5,
  },
];
