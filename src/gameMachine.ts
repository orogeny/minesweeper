import { assign, createMachine } from "xstate";
import { GameConfig, gameConfigs } from "./game";

type GameContext = {
  config: GameConfig;
  // flags: number;
  // cells: Cell[];
  // findNeighbours: (index: number) => Set<number>;
};

const gameMachine = createMachine({
  types: {
    context: {} as GameContext,
    events: {} as { type: "game.setup"; level: string },
  },
  id: "game",
  initial: "start",
  context: {
    config: {
      level: "",
      width: 0,
      height: 0,
      mines: 0,
      timeLimit: 0,
    },
  },
  states: {
    start: {
      on: {
        "game.setup": {
          actions: assign({
            config: ({ event: { level } }) =>
              gameConfigs.find((c) => c.level === level)!,
          }),
          target: "ready",
        },
      },
    },
    ready: {},
    lost: {},
    won: {},
  },
});

export { gameMachine };
export type { GameContext };
