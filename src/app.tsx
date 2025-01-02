import { useMachine } from "@xstate/react";
import { Board } from "./components/board";
import { SelectGame } from "./components/select_game";
import { gameConfigs } from "./game";
import { gameMachine } from "./gameMachine";

function App() {
  const [state, send] = useMachine(gameMachine);

  const handleGameSelection = (level: string) => {
    send({ type: "SETUP", level });
  };

  if (state.value === "start") {
    return (
      <SelectGame configs={gameConfigs} handleSelection={handleGameSelection} />
    );
  }

  return <Board />;
}

export { App };
