import React from "react";

import Laugh from "./laugh";
import Smile from "./smile";
import Peace from "./peace";
import Frown from "./frown";
import Surprised from "./surprised";
import Nervous from "./nervous";
import Pucker from "./pucker";
import Sad from "./sad"

export default function mouth (props: { style: string }): SVGElement {
  const { style } = props;
  switch (style) {
    case "laugh": return <Laugh />;
    case "smile": return <Smile />;
    case "frown": return <Frown />;
    case "surprised": return <Surprised />;
    case "nervous": return <Nervous />;
    case "pucker": return <Pucker />;
    case "sad": return <Sad />;
    case "peace":
    default:
      return <Peace />;
  }
}
