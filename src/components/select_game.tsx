import { GameConfig } from "../game";

type SelectGameProps = {
  configs: GameConfig[];
  handleSelection: (level: string) => void;
};

function SelectGame({
  configs: gameConfigs,
  handleSelection,
}: SelectGameProps) {
  return (
    <div className="select-game">
      <p className="instructions">Choose the challenge you can handle...</p>

      <div className="game-configs">
        {gameConfigs.map((config) => (
          <div
            className="difficulty"
            key={config.level}
            onClick={() => handleSelection(config.level)}
          >
            <p className="level">{config.level}</p>
            <p className="grid-size">
              {config.width} x {config.height} cells
            </p>
            <p className="mines">{config.mines} mines</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { SelectGame };
