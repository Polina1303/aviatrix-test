import { useCallback, useEffect, useRef, useState } from "react";
import "./GameBoard.css";
import { START_COEFFICIENT } from "../../App";
import { ALL_RANDOM_NUMBERS } from "../allRandomNumber";

export interface Props {
  randomNumber?: number;
  coefficient: number;
  setCoefficient: React.Dispatch<React.SetStateAction<number>>;
  setCount: (arg: number) => void;
  setIsBat: (arg: boolean) => void;
  setRandomNumber: (arg: number) => void;
}

const GameBoard = ({
  randomNumber,
  coefficient,
  setCoefficient,
  setCount,
  setIsBat,
  setRandomNumber,
}: Props) => {
  const coefficientRef = useRef<number>(START_COEFFICIENT);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationEnd, setAnimationEnd] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [allRandomNumber, setAllRandomNumber] =
    useState<number[]>(ALL_RANDOM_NUMBERS);

  const resetUseEffect = useCallback(() => {
    setIsBat(false);
    setCoefficient(START_COEFFICIENT);
    coefficientRef.current = START_COEFFICIENT;
    const generatedRandomNumber = Math.random() * (3 - 1.01) + 1.01;
    const roundedRandomNumber = Math.round(generatedRandomNumber * 100) / 100;
    setRandomNumber(roundedRandomNumber);
  }, [setRandomNumber]);

  useEffect(() => {
    resetUseEffect();
  }, [resetUseEffect]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    const delayTimer = setTimeout(() => {
      setAnimationEnd(true);
      if (randomNumber && coefficientRef.current) {
        timer = setInterval(() => {
          setCoefficient((prevCoefficient: number) => {
            const newCoefficient = Number((prevCoefficient + 0.01).toFixed(2));
            return newCoefficient;
          });
        }, 100);
        setIntervalId(timer);
        return () => {
          clearInterval(timer);
        };
      }
    }, 2000);

    if (coefficient === randomNumber) {
      setIsAnimating(true);
      clearInterval(intervalId!);
      setCoefficient((prevCoefficient: number) => {
        return randomNumber;
      });
      coefficientRef.current = 0;
      setAllRandomNumber((prevAllRandomNumber) => [
        randomNumber,
        ...prevAllRandomNumber,
      ]);
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationEnd(false);
        setCoefficient(START_COEFFICIENT);
        coefficientRef.current = START_COEFFICIENT;
        resetUseEffect();
        setCount(0.1);
      }, 5000);
    }

    return () => {
      clearTimeout(delayTimer);
    };
  }, [
    coefficient,
    coefficientRef,
    intervalId,
    randomNumber,
    resetUseEffect,
    setAnimationEnd,
    setCoefficient,
    setCount,
    setIntervalId,
    setIsAnimating,
  ]);

  return (
    <div className="game-board">
      <div className="game-board__cover-number">
        <div className="number-container">
          {allRandomNumber.map((number, index) => (
            <div className="number-cell" key={index}>
              {number.toFixed(2)}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`plane ${animationEnd ? "takeoff-animation" : ""}`}
        style={{
          animationDuration: `${
            randomNumber && randomNumber - START_COEFFICIENT
          }s`,
          transform: `translate(${(coefficient - START_COEFFICIENT) * 50}%, -${
            (coefficient - START_COEFFICIENT) * 50
          }%)`,
        }}
      >
        <img
          className="game-board__image"
          src={require("../../assets/images/plane.png")}
          alt="plane"
        />
      </div>
      {isAnimating && (
        <img
          className="game-board__gif"
          src={require("../../assets/images/explosion.gif")}
          alt="plane"
        />
      )}
      {coefficient > START_COEFFICIENT ? (
        <p
          className={`game-board__coefficient ${
            isAnimating ? "animating" : ""
          }`}
        >
          {coefficient.toFixed(2)}X
        </p>
      ) : (
        <p
          className={`game-board__coefficient ${
            isAnimating ? "animating" : ""
          }`}
        ></p>
      )}
    </div>
  );
};

export default GameBoard;
