import { MouseEvent } from "react";

export default interface SVGEelement {
    addClassName: string;
    color?: string;
    onClick?: (e: MouseEvent<SVGSVGElement>) => void;
}
