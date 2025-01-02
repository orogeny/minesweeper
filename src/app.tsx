import { SelectGame } from "./components/select_game";
import { gameConfigs } from "./game";

function App() {
  const handleGameSelection = (level: string) => {
    console.log(`You selected ${level}`);
  };

  return (
    <SelectGame configs={gameConfigs} handleSelection={handleGameSelection} />
  );
}

export { App };
