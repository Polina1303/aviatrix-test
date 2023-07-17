import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard/GameBoard";
import Header from "./components/Header/Header";
import Scoreboard from "./components/Scoreboard/Scoreboard";

export const START_COEFFICIENT = 1.0;

function App() {
  const [randomNumber, setRandomNumber] = useState<number>();
  const [coefficient, setCoefficient] = useState<number>(START_COEFFICIENT);
  const [winning, setWinning] = useState(1000.0);
  const [count, setCount] = useState(0.1);
  const [isBat, setIsBat] = useState(false);

  return (
    <div className="app">
      <Header winning={winning} />
      <GameBoard
        randomNumber={randomNumber}
        coefficient={coefficient}
        setCoefficient={setCoefficient}
        setCount={setCount}
        setIsBat={setIsBat}
        setRandomNumber={setRandomNumber}
      />
      <Scoreboard
        randomNumber={randomNumber}
        coefficient={coefficient}
        winning={winning}
        setWinning={setWinning}
        count={count}
        setCount={setCount}
        isBat={isBat}
        setIsBat={setIsBat}
      />
    </div>
  );
}

export default App;
