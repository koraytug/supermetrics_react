import {useState} from "react";
import "./loginpage.css";
import PropTypes from "prop-types";
import loginUser from "../../services/login.service";
import ICredentials from "../../models/iregister-token";

type LoginComponentProps = {
    setToken: (token: string, credentials: ICredentials) => void;
};

export default function LoginPage(props:LoginComponentProps): JSX.Element {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const credentials: ICredentials = {
            client_id: "ju16a6m81mhid5ue1z3v2g0uh",
            email: email,
            name: name
        };
        const token = await loginUser(credentials);
        console.log("login-scr-token", token.data);
        console.log("login-scr-credentials", credentials);
        props.setToken(token.data, credentials);
    };

    return (
        <div className="login-container">

            <form onSubmit={handleSubmit}>

                <div className="login-items shadow-dreamy ">
                    <div className="login-title">
                         LOGIN
                    </div>
                    <div className="name-row">
                        <div className="column">
                            <div className="label-row">
                                <label>Name</label>
                            </div>
                            <div className="textbox-row">
                                <input className="textbox border" type="text" onChange={e => setName(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="email-row">
                        <div className="column">
                            <div className="label-row">
                                <label>Email</label>
                            </div>
                            <div className="textbox-row">
                                <input className="textbox border" type="text" onChange={e => setEmail(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="button-row">
                        <button type="submit" className="border go-button">Go</button>
                    </div>
                </div>

            </form>
        </div>
    );
}
LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
};
