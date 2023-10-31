import { PAGES } from "../App";
import { TStageDetails } from "../data/stages";

type StageSelectionProps = {
  stages: TStageDetails[];
  changePage: (page: PAGES) => void;
  stageSelection: (level: number) => void;
};

const StageSelection = ({ stages, changePage, stageSelection }: StageSelectionProps) => {
  return (
    <div className="stage-selection-container">
      <h1 className="game-title">Words</h1>
      <div>
        <h1 style={{ color: "white", textAlign: "center" }}>Alege un nivel</h1>
        <div className="stage-list">
          {stages.map((stage) => (
            <button
              key={stage.level}
              className="stage-btn"
              onClick={() => {
                stageSelection(stage.level);
              }}
            >
              {stage.level}
            </button>
          ))}
        </div>
      </div>
      <button
        className="game-btn"
        onClick={() => changePage("home")}
        style={{ alignSelf: "end", marginRight: "30px", marginBottom: "30px" }}
      >
        Inapoi
      </button>
    </div>
  );
};

export default StageSelection;
