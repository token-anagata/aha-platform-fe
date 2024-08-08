import SVGEelement from "@/types/svg"

const ArrowRightIcon: React.FC<SVGEelement> = ({ addClassName, color }) => {
    return (
        <svg fill={color} viewBox="0 0 16 16" className={addClassName} width="14" height="14">
            <path fill="currentColor" fillRule="evenodd" d="M4.96 14.54a1 1 0 0 1 0-1.41L10.09 8 4.96 2.87a1 1 0 0 1 1.41-1.41l5.84 5.83a1 1 0 0 1 0 1.42l-5.84 5.83a1 1 0 0 1-1.41 0Z" clipRule="evenodd"></path>
        </svg>
    )
}

export default ArrowRightIcon