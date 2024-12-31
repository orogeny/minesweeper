type Cell = {
  exposed: boolean;
  flagged: boolean;
  mined: boolean;
  adjacentMines: number;
};

function Square() {
  return <div className=""></div>;
}

export { Square };
export type { Cell };
