import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, unsetCredentials } from "../../Utils/AuthSlice";
import { useVerifyTokenMutation } from "../../app/Services/authApi";

function Protected(props) {
    const dispatch = useDispatch();
    const store_token = useSelector((state) => state.auth.JWTtoken);
    const storage_token = localStorage.getItem("token");
    const [verifyToken] = useVerifyTokenMutation();

    const verifyUser = async () => {
        try {
            await verifyToken().unwrap();
        } catch (error) {
            localStorage.clear();
            dispatch(unsetCredentials());
        }
    }

    if(!store_token) {
        if(storage_token) {
            verifyUser();
        
            const user = {
                name : localStorage.getItem('name'),
                email : JSON.parse(storage_token).email,
                token : localStorage.getItem('encodedToken'),
                id : JSON.parse(storage_token).id
                }
            dispatch(setCredentials(user));

        }
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default Protected;
