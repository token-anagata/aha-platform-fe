import { useLocation } from "react-router-dom";

export const useQueryUrl = () => {
    return new URLSearchParams(useLocation().search);
};