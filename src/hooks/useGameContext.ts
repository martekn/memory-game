import { useContext } from "react";
import { GameContext } from "@context/GameContext";
import { GameContextValue } from "@/types";

export const useGameContext = (): GameContextValue => {
  const gameContext = useContext(GameContext);

  if (gameContext === undefined) {
    throw new Error("useGameContext must be inside a GameProvider");
  }
  return gameContext;
};
