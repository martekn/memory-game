import { useEffect, useRef, useState } from "react";
import s from "./AudioControl.module.scss";

export const AudioControl = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeBarRef = useRef<HTMLInputElement>(null);
  const [volume, setVolume] = useState(50);

  let hasClicked = false;

  window.addEventListener("click", () => {
    if (hasClicked) {
      return;
    }
    hasClicked = true;
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.play();
    }
  });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setVolume(Number(e.currentTarget.value));
  };

  return (
    <div className={s.container}>
      <audio ref={audioRef} loop controls src="./media/caketown.mp3"></audio>
      <div className="flow">
        <div>Volume</div>
        <input
          type="range"
          ref={volumeBarRef}
          step="step"
          value={volume}
          min="0"
          max="100"
          onChange={(e) => onChangeHandler(e)}
        ></input>
      </div>
    </div>
  );
};
