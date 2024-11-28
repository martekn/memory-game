import s from "./Heading.module.scss";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  headingStyle?: "HEADING_1" | "HEADING_2";
  children?: React.ReactNode;
  className?: "string";
}

export const Heading = ({ headingLevel = "p", headingStyle = "HEADING_1", children, className }: Props) => {
  const Heading = headingLevel;
  let headingLevelClass = s.heading1;

  switch (headingStyle) {
    case "HEADING_2":
      headingLevelClass = s.heading2;
      break;

    default:
      headingLevelClass = s.heading1;
      break;
  }

  return <Heading className={`${headingLevelClass} ${className}`}>{children}</Heading>;
};
