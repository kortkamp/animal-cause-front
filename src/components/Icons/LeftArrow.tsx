import * as React from "react";
import { SVGProps } from "react";
const LeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 18 18"
    {...props}>
    <title>left arrow</title>
    <path d="M.284,9.52l7.863,7.863a.971.971,0,0,0,1.373,0l.917-.917a.971.971,0,0,0,0-1.372L4.208,8.834l6.231-6.261a.971.971,0,0,0,0-1.372L9.52.284a.971.971,0,0,0-1.373,0L.284,8.147A.971.971,0,0,0,.284,9.52Z">
    </path>
  </svg>
);
export default LeftArrow;