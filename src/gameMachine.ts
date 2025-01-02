import { createMachine } from "xstate";
import { Cell, GameConfig } from "./game";

type GameContext = {
  config: GameConfig;
  flags: number;
  cells: Cell[];
};

const gameMachine = createMachine({
  id: "game",
  initial: "idle",
  states: {
    idle: {
      on: {
        "game.setup": {
          target: "loading",
        },
      },
    },
    loading: {
      on: {
        "game.loaded": {
          target: "ready",
        },
        "game.failed": {
          target: "error",
        },
      },
    },
    ready: {},
    lost: {},
    won: {},
    error: {},
  },
});

export { gameMachine };
export type { GameContext };
