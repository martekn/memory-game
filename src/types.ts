export type GameState = "MENU" | "IN_PROGRESS" | "GAME_OVER" | "GAME_WON";

export interface GameContextValue {
  score: number;
  record: number;
  gameView: GameState;
  gameStates: Record<string, GameState>;
  currentRound: number;
  resetScore: () => void;
  addScore: () => void;
  resetRound: () => void;
  nextRound: () => void;
  displayGameOver: () => void;
  displayGameMenu: () => void;
  displayGameStart: () => void;
  displayGameWon: () => void;
}
