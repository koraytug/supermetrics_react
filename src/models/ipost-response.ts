import IPost from "./ipost";

export default interface IPostResponse{
    page: number;
    posts:IPost[];
}
