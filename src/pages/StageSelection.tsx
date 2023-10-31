import { SetStateAction } from "react";
import { PAGES, TStageDetails } from "../App";

const StageSelection = ({
  stages,
  setCurrentPage,
  handleStageSelection,
}: {
  stages: TStageDetails[];
  setCurrentPage: React.Dispatch<SetStateAction<PAGES>>;
  handleStageSelection: (level: number) => void;
}) => {
  return (
    <div className="stage-selection-container">
      <h1 style={{ color: "white" }}>Select stage</h1>
      <div className="stage-list">
        {stages.map((stage) => (
          <button
            key={stage.level}
            className="stage-btn"
            onClick={() => {
              handleStageSelection(stage.level);
            }}
          >
            {stage.level}
          </button>
        ))}
      </div>
      <button className="game-btn" onClick={() => setCurrentPage("home")}>
        Inapoi
      </button>
    </div>
  );
};

export default StageSelection;
