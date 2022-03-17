import IPost from "../models/ipost";
import IPostRequestParameter from "../models/ipost-request-parameter";
import IPostResponse from "../models/ipost-response";
import ICredentials from "../models/iregister-token";
import IUserList from "../models/iuserlist";
import loginUser from "./login.service";

type HomePageProps = {
    setToken: (token: string, credentials: ICredentials) => void;
    credentials: ICredentials;
    token:string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getPosts(requestParams: IPostRequestParameter, homePageProps: HomePageProps, signal: AbortSignal): Promise<IPostResponse> {
    console.log("get_post_token_param", requestParams);
    try {
        const response = await fetch(`https://api.supermetrics.com/assignment/posts?page=${requestParams.page}&sl_token=${requestParams.sl_token}`, {signal: signal});
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const isJson = response.headers.get("content-type")?.includes("application/json");
        const data = isJson ? await response.json() : [];
        return Promise.resolve(data.data);
    } catch (error: any) {
        const token = await loginUser(homePageProps.credentials).catch(error => {
            return Promise.reject(error);
        });
        homePageProps.setToken(token.data, homePageProps.credentials);
        await getPosts(requestParams, homePageProps, signal).catch(error => {
            return Promise.reject(error);
        });

        return Promise.reject(error);
    }
}


export const getUserList = (post: IPost[]): IUserList[] => {
    const users :Map<string, number> = new Map<string, number>();
    post.forEach(item => {
        if (users.has(item.from_name)) {
            const count:number = users.get(item.from_name) || 0;
            users.set(item.from_name, count + 1);
        } else {
            users.set(item.from_name, 1);
        }

        return users;
    });

    const result : IUserList[] = [];

    users.forEach((value, key) => {
        return result.push({
            from_name: key,
            count: value
        });
    });

    result.sort((a, b) => (a.from_name > b.from_name) ? 1 : ((b.from_name > a.from_name) ? -1 : 0));
    return result;


};

export const getParsedDate = (strDate: string): string => {
    const date = new Date(strDate);
    const month: string = date.toLocaleString("default", {month: "long"});

    let day: string = date.getDate().toString();

    const hours: string = strDate.substring(11, 13);
    const minutes: string = strDate.substring(14, 16);
    const seconds: string = strDate.substring(17, 19);

    const time = `${hours}:${minutes}:${seconds}`;

    const year: string = date.getFullYear().toString();
    if (date.getDate() < 10) {
        day = "0" + day;
    }

    return `${month} ${day}, ${year} ${time}`;

};
