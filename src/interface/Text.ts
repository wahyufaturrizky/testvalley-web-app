import { JSX } from "react";

export interface TextInterface {
  label: string | JSX.Element;
  className: string;
  onClick?: () => void;
}
