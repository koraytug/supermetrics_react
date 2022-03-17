import {useState} from "react";
import ICredentials from "../models/iregister-token";

export default function useToken():any {
    const getToken = () => {
        const tokenString = typeof window !== "undefined" ? localStorage.getItem("sl_token") || "{}" : "";

        const userToken = JSON.parse(tokenString || "");
        return userToken;
    };
    const getCredentials = () => {
        const credentialObject = typeof window !== "undefined" ? localStorage.getItem("creds") || "{}" : "";

        return JSON.parse(credentialObject || "");
    };

    const [token, setToken] = useState(getToken());
    const [credentials, setCredentials] = useState(getCredentials());

    const saveToken = (userToken:any, credentials: ICredentials) => {
        localStorage.setItem("sl_token", JSON.stringify(userToken.sl_token));
        localStorage.setItem("creds", JSON.stringify(credentials));
        setToken(userToken.sl_token);
        setCredentials(credentials);
    };

    return {
        setToken: saveToken,
        token: token,
        credentials: credentials
    };

}
