import React from "react";
import "./Button.css";
interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { label, onClick, isDisabled } = props;
  return (
    <div className="buttonContainer">
      <button
        type="button"
        className="button"
        disabled={isDisabled}
        onClick={onClick}
      >
        {label}
      </button>
      {/* <span>{label}</span> */}
    </div>
  );
};
export default Button;
