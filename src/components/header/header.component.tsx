import "./header.css";
import UpArrow from "../../assets/arrow-up.png";
import DownArrow from "../../assets/arrow-down.png";

interface HeaderComponentProps{
    // sortPosts: (type: string) => void;
    sortPosts:any;
}
// const Header = (props:HeaderComponentProps): JSX.Element => {
const Header = (props:HeaderComponentProps): JSX.Element => {
    const clickHandler = (user: string) => {
        props.sortPosts(user);
    };

    return (
        <div className="header-container">

            <div className="user-search-column" >
                <input placeholder="search" className="border-styl textbox-item"></input>
            </div>
            <div className="page-arrows-column" >
                <div className="row">
                    <div className="column">
                        <img src={UpArrow} onClick={() => { clickHandler("asc")}} className="image-size"/>
                    </div>
                    <div className="column">
                        <img src={DownArrow} onClick={() => { clickHandler("desc")}} className="image-size"/>
                    </div>
                </div>
            </div>
            <div className="post-search-column" >
                <input placeholder="search" className="border-styl textbox-item"></input>
            </div>
        </div>
    );
};

export default Header;
