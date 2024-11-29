import { ReactElement, useState } from "react";
import { GameContext } from "@context/GameContext";
import { GameState } from "@/types";

const useGameStats = (initial = 0) => {
  const [score, setScore] = useState(initial);
  const storageRecord = localStorage.getItem("record");
  const initialRecord = Number(storageRecord) || 0;
  const [record, setRecord] = useState(initialRecord);
  const [currentRound, setCurrentRound] = useState(initial);

  return {
    score,
    record,
    currentRound,
    resetScore: () => setScore(0),
    addScore: () => {
      const newScore = score + currentRound * 50;
      setScore(newScore);
      if (newScore > record) {
        setRecord(newScore);
        localStorage.setItem("record", JSON.stringify(newScore));
      }
    },
    resetRound: () => setCurrentRound(1),
    nextRound: () => setCurrentRound(currentRound + 1),
  };
};

const useGameView = () => {
  const gameStates: Record<string, GameState> = {
    MENU: "MENU",
    IN_PROGRESS: "IN_PROGRESS",
    GAME_OVER: "GAME_OVER",
    GAME_WON: "GAME_WON",
  };

  const [gameView, setGameView] = useState<GameState>(gameStates.MENU);

  return {
    gameView,
    gameStates,
    displayGameOver: () => setGameView(gameStates.GAME_OVER),
    displayGameMenu: () => setGameView(gameStates.MENU),
    displayGameStart: () => setGameView(gameStates.IN_PROGRESS),
    displayGameWon: () => setGameView(gameStates.GAME_WON),
  };
};

interface Props {
  children: ReactElement;
}

export const GameProvider = ({ children }: Props) => {
  const { gameView, gameStates, displayGameOver, displayGameMenu, displayGameStart, displayGameWon } = useGameView();
  const { score, record, currentRound, resetScore, addScore, resetRound, nextRound } = useGameStats();

  return (
    <GameContext.Provider
      value={{
        gameView,
        gameStates,
        record,
        score,
        currentRound,
        displayGameOver,
        displayGameMenu,
        displayGameStart,
        displayGameWon,
        resetScore,
        addScore,
        resetRound,
        nextRound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
