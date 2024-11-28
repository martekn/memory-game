import { Game } from "@/components/Game/";
import { GameProvider } from "./provider/GameProvider";

const App = () => {
  return (
    <>
      <GameProvider>
        <Game />
      </GameProvider>
    </>
  );
};

export default App;
