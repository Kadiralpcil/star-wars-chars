import { FC, ReactNode } from "react";
import "./card.scss";

interface CardProps {
  children: ReactNode | string;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return <div className={`card ${className ?? ""}`}>{children}</div>;
};
