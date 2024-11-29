import { Game } from "@components/Game/";
import { GameProvider } from "./provider/GameProvider";
import { AudioControl } from "@components/AudioControl";

const App = () => {
  return (
    <>
      <GameProvider>
        <Game />
      </GameProvider>
      <AudioControl />
    </>
  );
};

export default App;
