import { createMachine } from "xstate";
import { Cell, GameConfig, gameConfigs, layMines } from "./game";
import { getNeighbours } from "./utils";

type GameContext = {
  config: GameConfig;
  flags: number;
  cells: Cell[];
  findNeighbours: (index: number) => Set<number>;
};

const gameMachine = createMachine({
  id: "game",
  initial: "start",
  states: {
    start: {
      on: {
        SETUP: {
          actions: ({ context, event: { level } }) => {
            const config = gameConfigs.find((c) => c.level === level)!;

            const flags = config.mines;
            const cells = layMines(config.width, config.height, config.mines);
            const findNeighbours = getNeighbours(config.width, config.height);

            context.config = { config, flags, cells, findNeighbours };

            console.log(`game for "${level}" level has been setup`);
          },
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
