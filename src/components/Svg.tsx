import React from "react";

const Svg = React.forwardRef<SVGSVGElement>((props, forwardRef) => {
  return <svg ref={forwardRef}></svg>;
});

export { Svg };
