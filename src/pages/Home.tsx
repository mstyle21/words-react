import { SetStateAction } from "react";
import { PAGES } from "../App";

const Home = ({ setCurrentPage }: { setCurrentPage: React.Dispatch<SetStateAction<PAGES>> }) => {
  return (
    <div className="home-container">
      <button className="game-btn" onClick={() => setCurrentPage("stage-selection")}>
        Start
      </button>
    </div>
  );
};

export default Home;
