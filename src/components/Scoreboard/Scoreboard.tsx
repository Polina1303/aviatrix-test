import { useEffect, useState } from "react";
import "./Scoreboard.css";

export interface Props {
  randomNumber?: number;
  coefficient: number;
  winning: number;
  setWinning: (arg: number) => void;
  count: number;
  setCount: (arg: number) => void;
  isBat: boolean;
  setIsBat: (arg: boolean) => void;
}

const Scoreboard = ({
  randomNumber,
  coefficient,
  winning,
  setWinning,
  count,
  setCount,
  isBat,
  setIsBat,
}: Props) => {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (numbers.length === 0) {
      setCount(0.1);
    } else {
      const result = numbers.reduce((accumulate, item) => {
        return item + accumulate;
      }, 0);
      setCount(result);
    }
  }, [numbers]);

  const handleClickSum = (number: number) => {
    if (isBat === false) {
      setNumbers([...numbers, number]);
    }
  };

  const handleButtonClick = (count: number) => {
    if (randomNumber && randomNumber > coefficient) {
      setWinning(winning - count);
    }
    setIsBat(true);
  };

  const batGrowth = () => {
    return (count * coefficient).toFixed(2);
  };

  const winningsCollect = () => {
    if (randomNumber && randomNumber > coefficient) {
      setWinning(winning + count * coefficient);

      setIsBat(false);
      setCount(0.1);
    }
  };

  return (
    <div className="scoreboard">
      <div className="scoreboard__content">
        <div className="scoreboard__info">
          <div className="scoreboard__info-container">
            <img
              className="scoreboard__logo"
              src={require("../../assets/images/euroCoin.png")}
              alt="euroCoin"
            />
            <p>{count}</p>
          </div>
          {isBat ? (
            <button
              className="scoreboard__info-button-cash-out"
              onClick={winningsCollect}
            >
              <div className="scoreboard__cover-button-cash-out">
                <img
                  className="scoreboard-button-cash-out__logo"
                  src={require("../../assets/images/euroCoin.png")}
                  alt="euroCoin"
                />
                <p className="scoreboard__text">Cash out</p>
              </div>
              <div className="scoreboard__bat"> {batGrowth()}</div>
            </button>
          ) : (
            <button
              className="scoreboard__info-button"
              onClick={() => handleButtonClick(count)}
            >
              Place bet
            </button>
          )}
        </div>
        <div className="scoreboard__buttons">
          <button
            className="scoreboard__button"
            onClick={() => handleClickSum(1)}
          >
            1
          </button>
          <button
            className="scoreboard__button"
            onClick={() => handleClickSum(2)}
          >
            2
          </button>
          <button
            className="scoreboard__button"
            onClick={() => handleClickSum(5)}
          >
            5
          </button>
          <button
            className="scoreboard__button"
            onClick={() => handleClickSum(10)}
          >
            10
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
