import ICredentials from "../models/iregister-token";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function loginUser(credentials:ICredentials) {
    console.log(JSON.stringify(credentials));
    return fetch("https://api.supermetrics.com/assignment/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
      .then(data => data.json());
}


