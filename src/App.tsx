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
      content = <Home setCurrentPage={setCurrentPage} />;
      break;
    case "stage-selection":
      content = (
        <StageSelection stages={stages} setCurrentPage={setCurrentPage} handleStageSelection={handleStageSelection} />
      );
      break;
    case "stage":
      selectedStageDetails = stages.find((stage) => stage.level === selectedStage);
      if (selectedStageDetails) {
        content = <Stage words={selectedStageDetails.words} setCurrentPage={setCurrentPage} />;
      }

      break;
  }

  return (
    <div className="game-wrapper">
      <div className="game-background"></div>
      <div className="game-container">
        <div className="game-box">
          <h1 className="game-title">Words</h1>
          {error && <div id="errorMsg">{error}</div>}
          {content}
        </div>
      </div>
    </div>
  );
}

export default App;
