import React from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title } = props;
  return (
    <div className="header">
      <h2>{title}</h2>
    </div>
  );
};

export default Header;
