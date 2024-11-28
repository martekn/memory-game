import s from "./CornerDecoration.module.scss";

interface Props {
  cornerPosition: "top right" | "top left" | "bottom right" | "bottom left";
}

export const CornerDecoration = ({ cornerPosition }: Props) => {
  let positionClass;

  switch (cornerPosition) {
    case "top right":
      positionClass = s.topRight;
      break;
    case "bottom right":
      positionClass = s.bottomRight;
      break;
    case "bottom left":
      positionClass = s.bottomLeft;
      break;
    default:
      positionClass = s.topLeft;
      break;
  }

  return (
    <div className={`${s.container} ${positionClass}`}>
      <div className={s.triangle}></div>
    </div>
  );
};
