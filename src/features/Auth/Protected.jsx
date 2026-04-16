import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, unsetCredentials } from "../../Utils/AuthSlice";
import { useVerifyTokenQuery } from "../../app/Services/authApi";

function Protected(props) {
    const dispatch = useDispatch();
    const store_token = useSelector((state) => state.auth.JWTtoken);
    const storage_token = localStorage.getItem("token");

    const { error } = useVerifyTokenQuery(undefined, { skip: !storage_token });

    useEffect(() => {
        if (error) {
            localStorage.clear();
            dispatch(unsetCredentials());
        }
    }, [error, dispatch]);

    if (!store_token && storage_token) {
        const user = {
            name: localStorage.getItem("name"),
            email: JSON.parse(storage_token).email,
            token: localStorage.getItem("encodedToken"),
            id: JSON.parse(storage_token).id,
        };
        dispatch(setCredentials(user));
    }

    return <>{props.children}</>;
}

export default Protected;
