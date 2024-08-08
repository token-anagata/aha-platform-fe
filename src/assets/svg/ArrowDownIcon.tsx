import SVGEelement from "@/types/svg"

const ArrowDownIcon : React.FC<SVGEelement> = ({ addClassName }) => {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={addClassName}>
            <path d="M12 16L6 10H18L12 16Z" fill="currentColor" />
        </svg>
    )
}

export default ArrowDownIcon