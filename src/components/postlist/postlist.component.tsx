import "./postlist.css";
import IPost from "../../models/ipost";
import Post from "../post/post.component";

type PostListProps = {
    posts: IPost[];
};

function PostList(props:PostListProps): JSX.Element {
    return (
        <div className="post-list-container" >
            {props.posts.map((post, i) => (
                <Post key={i} post={post}/>
            )
            )}
        </div>
    );
}

export default PostList;
