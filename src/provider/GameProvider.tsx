import { ReactElement, useState } from "react";
import { GameContext } from "@context/GameContext";
import { GameState } from "@/types";

const GameStates: Record<string, GameState> = {
  MENU: "MENU",
  IN_PROGRESS: "IN_PROGRESS",
  GAME_OVER: "GAME_OVER",
};

interface Props {
  children: ReactElement;
}

export const GameProvider = ({ children }: Props) => {
  const [gameView, setGameView] = useState<GameState>(GameStates.MENU);
  const [record, setRecord] = useState(0);
  const [score, setScore] = useState(0);
  return (
    <GameContext.Provider value={{ gameView, record, score, setGameView, setRecord, setScore }}>
      {children}
    </GameContext.Provider>
  );
};
