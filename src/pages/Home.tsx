import { PAGES } from "../App";

type HomeProps = {
  changePage: (page: PAGES) => void;
};

const Home = ({ changePage }: HomeProps) => {
  return (
    <div className="home-container">
      <h1 className="game-title">Words</h1>
      <button className="game-btn" style={{ margin: "auto" }} onClick={() => changePage("stage-selection")}>
        Start
      </button>
    </div>
  );
};

export default Home;
