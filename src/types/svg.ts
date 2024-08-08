import { MouseEvent } from "react";

export default interface SVGEelement {
    addClassName: string;
    color?: string;
    darkMode?: boolean;
    onClick?: (e: MouseEvent<SVGSVGElement>) => void;
}
