import s from "./Game.module.scss";
import { Button } from "@components/Button";
import { CornerDecoration } from "@components/CornerDecoration";
import { useGameContext } from "@hooks/useGameContext";
import { GameState } from "@/types";

import { useState } from "react";
import { Heading } from "@components/Heading";

const GameStates: Record<string, GameState> = {
  MENU: "MENU",
  IN_PROGRESS: "IN_PROGRESS",
  GAME_OVER: "GAME_OVER",
};

const GameOverDisplay = () => {
  const { score, record, setGameView } = useGameContext();
  const handleClick = () => {
    setGameView(GameStates.IN_PROGRESS);
  };
  return (
    <div className={s.gameDisplay}>
      <div className={s.header}>
        <p className="fs-300">Zelda memory game</p>
      </div>
      <div className="flow">
        <Heading headingLevel="h1">Game over</Heading>
        <p>You selected the same image twice</p>
        <div className="flex-group mx-auto">
          <p>Score: {score}</p>
          <p>Record: {record}</p>
        </div>
      </div>
      <div className="margin-block-start-10">
        <Button text="Try again" onClick={handleClick} />
      </div>
    </div>
  );
};

const GameStartDisplay = () => {
  const { setGameView } = useGameContext();

  const handleClick = () => {
    setGameView(GameStates.IN_PROGRESS);
  };

  return (
    <div className={s.gameDisplay}>
      <div className="flow">
        <Heading headingLevel="h1" headingStyle="HEADING_2">
          Zelda memory game
        </Heading>

        <p>
          Gain points by selecting a new image, this will test your ability to memorize what you have already selected
        </p>
      </div>
      <div className="margin-block-start-10">
        <Button text="Start game" onClick={handleClick} />
      </div>
    </div>
  );
};

const GameInProgressDisplay = () => {
  const { score, record } = useGameContext();
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className={s.gameDisplay}>
      <div className="flex-group">
        <div>
          <Heading headingLevel="h1" headingStyle="HEADING_2">
            Zelda memory game
          </Heading>

          <p>Dont select the same image twice</p>
        </div>
        <div className="flex-group">
          <p>Score: {score}</p>
          <p>Record: {record}</p>
        </div>
      </div>
      <div className={s.cardContainer}>
        {images.map((image) => (
          <div className={s.card}>
            <img src={image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Game = () => {
  const { gameView } = useGameContext();

  let gameDisplay = <GameStartDisplay />;

  if (gameView === GameStates.IN_PROGRESS) {
    gameDisplay = <GameInProgressDisplay />;
  }

  if (gameView === GameStates.GAME_OVER) {
    gameDisplay = <GameOverDisplay />;
  }

  return (
    <div className={`container ${s.gameBody}`} data-game={gameView}>
      <div className={s.inner}>
        <CornerDecoration cornerPosition="top left" />
        <CornerDecoration cornerPosition="top right" />
        <CornerDecoration cornerPosition="bottom left" />
        <CornerDecoration cornerPosition="bottom right" />
        <div className={s.content}>{gameDisplay}</div>
      </div>
    </div>
  );
};
