import React, { FunctionComponent } from "react";
import "./StandardLayout.css";

interface LayoutProps {
  title: string;
}

export const StandardLayout: FunctionComponent<LayoutProps> = ({
  title,
  children,
}) => (
  <div className="standard">
    <h2>{title}</h2>
    {children}
  </div>
);
