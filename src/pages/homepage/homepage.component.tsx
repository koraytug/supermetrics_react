import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import Header from "../../components/header/header.component";
import PostList from "../../components/postlist/postlist.component";
import UserList from "../../components/userlist/userlist.component";
import IPost from "../../models/ipost";
import IPostRequestParameter from "../../models/ipost-request-parameter";
import IPostResponse from "../../models/ipost-response";
import ICredentials from "../../models/iregister-token";
import getPosts from "../../services/post.service";
import "./homepage.css";


type HomePageProps = {
    setToken: (token: string) => void;
    credentials: ICredentials;
    token:string;
};


const HomePage = (props:HomePageProps): JSX.Element => {
    const empt: IPost[] = [];
    const [posts, setPosts] = useState(empt);
    const [filteredPosts, setFilteredPosts] = useState(empt);
    const [pageNumber, setPageNumber] = useState(0);
    const [sort, setSort] = useState("desc");
    const [selectedUserIndex, setSelectedUserIndex] = useState(-1);

    const history = useHistory();
    const location = useLocation();

    const filterPostsByUser = (from_name: string, index: number) => {
        const result: IPost[] = posts.filter(post => post.from_name === from_name);
        setFilteredPosts(result);
        setSelectedUserIndex(index);
    };


    const sortPosts = (type: string) => {

        let result: IPost[] = [];
        if (type === "desc") {
            result = filteredPosts.sort((a, b) => (a.created_time > b.created_time) ? -1 : 1);
        } else {
            result = filteredPosts.sort((a, b) => (a.created_time < b.created_time) ? -1 : 1);
        }
        setFilteredPosts(result);

    };
    useEffect(() => {
        sortPosts(sort);
    }, [sort]);

    useEffect(() => {
        const controller = new AbortController();
        const signal: AbortSignal = controller.signal;

        const getPostItems = async () => {
            try {
                const reqPosts: IPostRequestParameter = {
                    page:pageNumber,
                    sl_token: props.token
                };
                const postResult:IPostResponse = await getPosts(reqPosts, props, signal);

                setPageNumber(postResult?.page);
                setPosts(postResult?.posts);
                setFilteredPosts(postResult?.posts);
            } catch (err) {
                console.error(err);
                history.push("/login", {state: {from: location}, replace: true});
            }
        };

        getPostItems();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div className="page-container">
            <div className="header-row">
                <Header sortPosts={setSort}/>
            </div>
            <div className="content-row">
                {(posts && posts.length > 0) ? <><div className="user-list-column">
                    <UserList posts={posts} setSelectedUser={filterPostsByUser} selectedIndex={selectedUserIndex} ></UserList>
                </div><div className="post-list-column">
                    <PostList posts={filteredPosts} />
                </div></>
                : <><div>No Results</div></>
                }

            </div>

        </div>
    );
};

export default HomePage;
