import { Controls } from "./controls";
import { Grid } from "./grid";

function Board() {
  return (
    <div className="board">
      <Grid />
      <Controls />
    </div>
  );
}

export { Board };
