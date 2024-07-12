import React from "react";

export default function hairThreeStrands(props: { color: string}): SVGElement {
  const { color } = props;
  return (
    <svg
      style={{
        position: "absolute",
        bottom: "40.8%",
        width: "97.6%",
        height: "63.5%",
        left: "-1.8%"
      }}
      width="240"
      height="203"
      viewBox="0 0 240 203"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M140 56C154.667 55.3333 180.4 47.2 166 20" stroke={color} strokeWidth="4"/>
      <path d="M114 54C128.667 53.3333 154.4 45.2 140 18" stroke={color} strokeWidth="4"/>
      <path d="M78 65C92.6667 64.3333 118.4 56.2 104 29" stroke={color} strokeWidth="4"/>
    </svg>

  );
}
