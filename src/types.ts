export type GameState = "MENU" | "IN_PROGRESS" | "GAME_OVER";

export const GameStates: Record<string, GameState> = {
  MENU: "MENU",
  IN_PROGRESS: "IN_PROGRESS",
  GAME_OVER: "GAME_OVER",
};

export interface GameContextValue {
  score: number;
  record: number;
  gameView: GameState;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setRecord: React.Dispatch<React.SetStateAction<number>>;
  setGameView: React.Dispatch<React.SetStateAction<GameState>>;
}
