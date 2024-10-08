import SVGEelement from "@/types/svg"

const ReloadIcon : React.FC<SVGEelement> = ({ addClassName }) => {
    return (
        <svg fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg" className={addClassName} viewBox="0 0 592.99 592.99">
            <g>
                <g>
                    <path d="M274.292,21.879C122.868,21.879,0,145.072,0,296.496C0,447.92,122.262,571.111,275.262,571.111v-91.799
			c-100.98,0-183.462-82.012-183.462-182.816c0-100.806,81.362-182.817,182.168-182.817c98.753,0,179.413,78.718,182.661,176.696
			h-45.236l90.799,127.541l90.799-127.541h-44.486C545.248,141.767,423.67,21.879,274.292,21.879z"/>
                </g>
            </g>
        </svg>
    )
}

export default ReloadIcon