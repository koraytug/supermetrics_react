import "./post.css";
import IPost from "../../models/ipost";
import {getParsedDate} from "../../services/post.service";

type PostProps = {
    post: IPost;
};

function Post(props:PostProps): JSX.Element {

    return (
        <div className="post-column">
            <div className="post-date-row">{getParsedDate(props.post.created_time)}-{props.post.from_name}</div>
            <div className="post-definition-row">{props.post.message}</div>
        </div>
    );
}

export default Post;
