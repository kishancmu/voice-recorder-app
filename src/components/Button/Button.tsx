import React from "react";
import "./Button.css";
import { BsPlayFill } from "react-icons/bs";
interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled: boolean;
  buttonIcon: React.ReactElement;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { buttonIcon, label, onClick, isDisabled } = props;
  return (
    <div className="buttonContainer">
      <button className="button" disabled={isDisabled} onClick={onClick}>
        <BsPlayFill />
      </button>
      <span>{label}</span>
    </div>
  );
};
export default Button;
