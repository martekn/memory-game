import s from "./Button.module.scss";

interface Props {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ text, onClick }: Props) => {
  return (
    <button className={s.primary} onClick={onClick}>
      {text}
    </button>
  );
};
