import { useState } from "react";
import Stage from "./pages/Stage";
import Home from "./pages/Home";
import StageSelection from "./pages/StageSelection";
import { stages } from "./data/stages";

export type PAGES = "home" | "stage-selection" | "stage";

function App() {
  const [currentPage, setCurrentPage] = useState<PAGES>("home");
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

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
  let selectedStageDetails;
  switch (currentPage) {
    default:
    case "home":
      content = <Home changePage={handleChangePage} />;
      break;
    case "stage-selection":
      content = <StageSelection stages={stages} changePage={handleChangePage} stageSelection={handleStageSelection} />;
      break;
    case "stage":
      selectedStageDetails = stages.find((stage) => stage.level === selectedStage);
      if (selectedStageDetails) {
        content = (
          <Stage
            key={selectedStage}
            stage={selectedStage}
            words={selectedStageDetails.words}
            changePage={handleChangePage}
            stageSelection={handleStageSelection}
          />
        );
      }

      break;
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
