import { getNeighbours } from "./utils";

type GameConfig = {
  level: string;
  width: number;
  height: number;
  mines: number;
  timeLimit: number;
};

type Cell = {
  exposed: boolean;
  flagged: boolean;
  mined: boolean;
  adjacentMines: number;
};

const gameConfigs: GameConfig[] = [
  { level: "Classic", width: 8, height: 8, mines: 9, timeLimit: 300 },
  { level: "Easy", width: 9, height: 9, mines: 10, timeLimit: 360 },
  { level: "Medium", width: 16, height: 16, mines: 40, timeLimit: 600 },
  { level: "Expert", width: 30, height: 16, mines: 99, timeLimit: 1200 },
];

function layMines(
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

  return cells;
}

export { gameConfigs, layMines };
export type { Cell, GameConfig };
