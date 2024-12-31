import { Cell } from "./components/square";

type Game = {
  width: number;
  height: number;
  mines: Set<number>;
  cells: Cell[];
  findNeighbours: (index: number) => Set<number>;
};

const machine = {
  initial: "idle",
  states: {
    idle: {
      SETUP: "loading",
    },
    loading: {
      RESOLVE: "ready",
      REJECT: "rejected",
    },
    ready: {
      FLAG: "flagg",
    },
    rejected: {},
  },
};

function setup(
  width: number,
  height: number,
  mines: number,
  locations?: Set<number>
) {
  if (mines >= width * height) {
    throw new Error("Too many mines");
  }

  const findNeighbours = getNeighbours(width, height);

  const mineLocations = locations ?? new Set<number>();

  while (mineLocations.size < mines) {
    mineLocations.add(Math.floor(Math.random() * mines));
  }

  const cells: Cell[] = Array.from({ length: width * height }).map((_, i) => ({
    exposed: false,
    flagged: false,
    mined: mineLocations.has(i),
    adjacentMines: Array.from(findNeighbours(i)).reduce(
      (acc, n) => (acc += mineLocations.has(n) ? 1 : 0),
      0
    ),
  }));

  return {
    width,
    height,
    mines: mineLocations,
    cells,
    findNeighbours,
  };
}

function getNeighbours(width: number, height: number) {
  return (index: number) => {
    const neighbours = new Set<number>();

    const col = index % width;
    const row = Math.floor(index / width);

    if (row - 1 >= 0) {
      if (col - 1 >= 0) neighbours.add((row - 1) * width + (col - 1));
      neighbours.add((row - 1) * width + col);
      if (col + 1 < width) neighbours.add((row - 1) * width + col + 1);
    }

    if (col - 1 >= 0) neighbours.add(row * width + col - 1);
    if (col + 1 < width) neighbours.add(row * width + col + 1);

    if (row + 1 < height) {
      if (col - 1 >= 0) neighbours.add((row + 1) * width + col - 1);
      neighbours.add((row + 1) * width + col);
      if (col + 1 < width) neighbours.add((row + 1) * width + col + 1);
    }

    return neighbours;
  };
}

export { setup };
export type { Game };
