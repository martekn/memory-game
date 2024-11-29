import s from "./Game.module.scss";
import { Button } from "@components/Button";
import { CornerDecoration } from "@components/CornerDecoration";
import { useGameContext } from "@hooks/useGameContext";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { Heading } from "@components/Heading";
import { useMountEffect } from "@/hooks/useMountEffect";
import { shuffle } from "@/utils/shuffle";
interface dataType {
  data: {
    category: string;
    description: string;
    common_locations: string[];
    dlc: boolean;
    drops: string[];
    id: number;
    image: string;
    name: string;
  }[];
  message: string;
  status: number;
}

interface ImageType {
  src: string;
  id: number;
}

const GameOverDisplay = () => {
  const { score, record, displayGameStart, resetScore } = useGameContext();
  const handleClick = () => {
    displayGameStart();
    resetScore();
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

const GameWonDisplay = () => {
  const { score, displayGameStart, resetScore } = useGameContext();
  const handleClick = () => {
    displayGameStart();
    resetScore();
  };

  return (
    <div className={s.gameDisplay}>
      <div className={s.header}>
        <p className="fs-300">Zelda memory game</p>
      </div>
      <div className="flow">
        <Heading headingLevel="h1">You won!</Heading>
        <p>You've clicked all 12 images without clicking the same image twice</p>
        <div className="flex-group mx-auto">
          <p>Top score: {score}</p>
        </div>
      </div>
      <div className="margin-block-start-10">
        <Button text="Play again" onClick={handleClick} />
      </div>
    </div>
  );
};

const GameStartDisplay = () => {
  const { displayGameStart } = useGameContext();

  const handleClick = () => {
    displayGameStart();
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

// Handles game over and adding score on clicking of image
const handleImageClick = (
  e: React.MouseEvent<HTMLDivElement>,
  selectedIDs: string[],
  setSelectedIDs: React.Dispatch<React.SetStateAction<string[]>>,
  addScore: () => void,
  displayGameOver: () => void,
  displayGameWon: () => void,
  resetRound: () => void,
  nextRound: () => void,
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>,
  images: ImageType[]
) => {
  const clickedID = e.currentTarget.getAttribute("data-image");
  if (!clickedID) {
    console.error("Clicked id not found");
    return;
  }

  if (selectedIDs.find((id) => id === clickedID)) {
    resetRound();
    displayGameOver();
  } else {
    setSelectedIDs([...selectedIDs, clickedID]);
    addScore();
    nextRound();
    setImages(shuffle(images));
    if (selectedIDs.length + 1 === 12) {
      displayGameWon();
    }
  }
};

const useGameImages = (initialImages: ImageType[] = []) => {
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
  const [images, setImages] = useState(initialImages);

  return {
    selectedIDs,
    images,
    resetSelectedIDs: () => setSelectedIDs([]),
    addSelectedImage: (id: string) => setSelectedIDs([...selectedIDs, id]),
    hasSelectedIDs: (id: string) => selectedIDs.find((existingID) => existingID === id),
    setImages,
  };
};

const GameCardGrid = () => {
  const { images, setImages } = useGameImages();
  const { addScore, displayGameOver, displayGameWon, resetRound, nextRound } = useGameContext();

  // State holding selected images
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);

  // Get the initial selection of images
  const { data, loading, error } = useFetch<dataType>(
    "https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters",
    "get"
  );
  useEffect(() => {
    if (!loading && !error && data) {
      const allImages = data?.data.map((monster) => ({ src: monster.image, id: monster.id }));
      const shuffledImages = shuffle(allImages);
      setImages(shuffledImages.slice(0, 12));
    }
  }, [data, loading, error, setImages]);

  if (loading) {
    return (
      <div className={s.cardContainer}>
        {[...Array(12)].map(() => (
          <div
            className={s.card}
            onClick={(e) =>
              handleImageClick(
                e,
                selectedIDs,
                setSelectedIDs,
                addScore,
                displayGameOver,
                displayGameWon,
                resetRound,
                nextRound,
                setImages,
                images
              )
            }
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    <div>An error has occurred, please try again later</div>;
  }

  return (
    <div className={s.cardContainer}>
      {images.map(({ src, id }) => (
        <div
          key={id}
          className={s.card}
          data-image={id}
          onClick={(e) =>
            handleImageClick(
              e,
              selectedIDs,
              setSelectedIDs,
              addScore,
              displayGameOver,
              displayGameWon,
              resetRound,
              nextRound,
              setImages,
              images
            )
          }
        >
          <img src={src} alt="" />
        </div>
      ))}
    </div>
  );
};

const GameInProgressDisplay = () => {
  const { score, record, resetScore, resetRound } = useGameContext();
  const { resetSelectedIDs } = useGameImages();

  useMountEffect(() => {
    resetScore();
    resetRound();
    resetSelectedIDs();
  });

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
      <GameCardGrid />
    </div>
  );
};

export const Game = () => {
  const { gameView, gameStates } = useGameContext();

  let gameDisplay = <GameStartDisplay />;

  if (gameView === gameStates.IN_PROGRESS) {
    gameDisplay = <GameInProgressDisplay />;
  }

  if (gameView === gameStates.GAME_OVER) {
    gameDisplay = <GameOverDisplay />;
  }
  if (gameView === gameStates.GAME_WON) {
    gameDisplay = <GameWonDisplay />;
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
