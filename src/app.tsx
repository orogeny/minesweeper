import { useMachine } from "@xstate/react";
import { Board } from "./components/board";
import { SelectGame } from "./components/select_game";
import { gameConfigs } from "./game";
import { gameMachine } from "./gameMachine";

function App() {
  const [state, send] = useMachine(gameMachine);

  console.log("level", state.context.config.level);

  const handleGameSelection = (level: string) => {
    send({ type: "game.setup", level });
  };

  if (state.value === "start") {
    return (
      <SelectGame configs={gameConfigs} handleSelection={handleGameSelection} />
    );
  }

  return <Board />;
}

export { App };
