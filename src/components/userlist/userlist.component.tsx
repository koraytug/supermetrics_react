import "./userlist.css";
import {getUserList} from "../../services/post.service";
import IUserList from "../../models/iuserlist";
import IPost from "../../models/ipost";

type UserListProps = {
    posts: IPost[];
    setSelectedUser: (userName: string, index: number) => void;
    selectedIndex: any;
};

function UserList(props:UserListProps): JSX.Element {
    const userList: IUserList[] = getUserList(props.posts);

    const clickHandler = (e: any, user: string, index: number) => {
        props.setSelectedUser(user, index);
    };
    return (
        <div className="container">
            {userList.map((user, i) => (
                <div key={"userRow" + i} className={`${i === props.selectedIndex ? "selected-user-row" : "user-row"}`} onClick={event => clickHandler(event, user.from_name, i)}>
                    <div key={"userName" + i} className="username-column">{user.from_name}ww</div>
                    <div key={"userCount" + i} className="count-column">{user.count}</div>
                </div>
            )
            )}
        </div>
    );
}

export default UserList;
