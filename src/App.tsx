import { useState } from "react";
import Stage from "./pages/Stage";
import Home from "./pages/Home";
import StageSelection from "./pages/StageSelection";
import { stages } from "./data/stages";
import { useProgress } from "./hooks/useProgress";
import { PAGES } from "./types";

function App() {
  const [currentPage, setCurrentPage] = useState<PAGES>("home");
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { progress, updateProgress } = useProgress();

  const handleStageSelection = (level: number) => {
    const selectedStageDetails = stages.find((stage) => stage.level === level);

    if (!selectedStageDetails) {
      setError(() => "Something went wrong!");
    } else {
      setSelectedStage(level);
      setCurrentPage("stage");
    }
  };

  const handleChangePage = (page: PAGES) => {
    setCurrentPage(page);
  };

  const handleUpdateProgress = (level: number) => {
    updateProgress({ ...progress, currentStage: level });
  };

  if (error) {
    setTimeout(() => {
      const elem = document.getElementById("errorMsg");

      if (elem) {
        elem.className = "fade-out";
        setTimeout(() => {
          setError(null);
        }, 1000);
      }
    }, 3000);
  }

  let content;
  switch (currentPage) {
    default:
    case "home":
      content = <Home changePage={handleChangePage} />;
      break;
    case "stage-selection":
      content = (
        <StageSelection
          stages={stages}
          userProgress={progress}
          changePage={handleChangePage}
          stageSelection={handleStageSelection}
        />
      );
      break;
    case "stage": {
      const selectedStageDetails = stages.find((stage) => stage.level === selectedStage);
      if (selectedStageDetails) {
        content = (
          <Stage
            key={selectedStage}
            stage={selectedStage}
            words={selectedStageDetails.words}
            changePage={handleChangePage}
            stageSelection={handleStageSelection}
            updateProgress={handleUpdateProgress}
          />
        );
      }

      break;
    }
  }

  return (
    <div className="game-wrapper">
      <div className="game-container">
        <div className="game-background"></div>
        <div className="game-box">
          {error && <div id="errorMsg">{error}</div>}
          {content}
        </div>
      </div>
    </div>
  );
}

export default App;
