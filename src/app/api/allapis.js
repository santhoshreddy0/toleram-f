import apiWrapper from "./base";

const loginHandler = (body) => {
    const url = `${import.meta.env.VITE_BASE_URL}/login`;
    return apiWrapper(url,"POST",body);
}

const getBets = (token) => {
    const url = `${process.env.BASE_URL}/userbets`;
    return apiWrapper(url,"GET",{},token);
}   

export {loginHandler};