import React from "react";
import "./Button.css";
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
        {buttonIcon}
      </button>
      <span>{label}</span>
    </div>
  );
};
export default Button;
