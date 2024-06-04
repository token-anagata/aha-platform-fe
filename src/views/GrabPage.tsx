import { useQueryUrl } from "@/utils/url";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GrabPage: React.FC = () => {
    const query = useQueryUrl()
    const token = query.get('token')
    const navigate = useNavigate();

    console.log(typeof token)

    useEffect(() => {
        localStorage.setItem('_X_AUTH_', token as string)

        if (token) {
          navigate("/");
        }

    }, [token])


    return null;
}


export default GrabPage