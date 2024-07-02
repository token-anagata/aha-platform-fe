

import SVGEelement from "@/types/svg"

const ContributeIcon: React.FC<SVGEelement> = ({ addClassName }) => {
    return (
        <svg version="1.1" className={addClassName} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" >
            <path fill="#519E2E" d="M16,23.999v-7.031c3.355-0.257,6-3.047,6-6.467V6.463c0-1.539-1.666-2.502-2.999-1.732L15.5,6.75
	l-3.501-2.02C10.666,3.961,9,4.924,9,6.463V10.5c0,3.42,2.645,6.211,6,6.467v7.031c-1.647-3.947-5.182-6.909-9.478-7.754
	c-1.33-0.262-2.54,0.92-2.32,2.258C4.183,24.485,8.676,29,15,29h1c6.324,0,10.817-4.515,11.799-10.497
	c0.22-1.338-0.99-2.52-2.32-2.258C21.182,17.09,17.647,20.052,16,23.999z M7.053,24.526C5.574,22.871,4.594,20.75,4.198,18.4
	c-0.117-0.691,0.501-1.301,1.188-1.162c5.159,1.045,9.129,5.411,9.572,10.762C11.808,27.99,9.076,26.789,7.053,24.526z M21,6.463
	v3.46l-4.5-2.596l3-1.731C20.167,5.212,21,5.693,21,6.463z M11.5,5.597l9.472,5.465l0,0c-0.305,3.012-3.04,5.305-6.214,4.89
	C11.991,15.59,10,13.087,10,10.296l0-3.833C10,5.693,10.833,5.212,11.5,5.597z M16.041,28c0.444-5.353,4.416-9.72,9.578-10.763
	c0.685-0.138,1.302,0.468,1.189,1.158C25.877,24.069,21.637,27.981,16.041,28z"/>
        </svg>
    )
}

export default ContributeIcon