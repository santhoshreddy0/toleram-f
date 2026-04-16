import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, unsetCredentials } from "../../Utils/AuthSlice";
import { useVerifyTokenMutation } from "../../app/Services/authApi";

function Protected(props) {
    const dispatch = useDispatch();
    const store_token = useSelector((state) => state.auth.JWTtoken);
    const storage_token = localStorage.getItem("encodedToken");
    const [verifyToken] = useVerifyTokenMutation();

    const verifyUser = async (token) => {
        try {
            const resp = await verifyToken(token).unwrap();
        } catch (error) {
            dispatch(unsetCredentials());
        }
    }

    if(!store_token) {
        if(storage_token) {
            verifyUser(storage_token);

            const user = {
                token : localStorage.getItem('encodedToken'),
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
