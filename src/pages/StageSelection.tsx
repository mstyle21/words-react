import { TStageDetails } from "../data/stages";
import { TUserProgress } from "../hooks/useProgress";
import { PAGES } from "../types";

type StageSelectionProps = {
  stages: TStageDetails[];
  userProgress: TUserProgress;
  changePage: (page: PAGES) => void;
  stageSelection: (level: number) => void;
};

const StageSelection = ({
  stages,
  userProgress,
  changePage,
  stageSelection,
}: StageSelectionProps) => {
  return (
    <div className="stage-selection-container">
      <h1 className="game-title">Words</h1>
      <div>
        <h1 style={{ color: "white", textAlign: "center" }}>Alege un nivel</h1>
        <div className="stage-list">
          {stages.map((stage) => (
            <button
              key={stage.level}
              className={`stage-btn ${
                stage.level <= userProgress.currentStage ? "active-stage" : ""
              }`}
              onClick={() => {
                if (stage.level <= userProgress.currentStage) {
                  stageSelection(stage.level);
                }
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
