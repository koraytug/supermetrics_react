import {Switch, Route} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import LoginPage from "./pages/login/loginpage.component";
import useToken from "./services/token.service";


function App(): JSX.Element {
    const {token, setToken, credentials} = useToken();

    if (!token || !credentials || JSON.stringify(token) === "{}" || token === "") {
        return <LoginPage setToken={setToken}/>;
    }
    return (
        <div>
            <Switch>
                {(token && JSON.stringify(token) !== "{}" && token !== "") && <>
                    <Route
                        exact
                        path="/"
                        render={() =>
                            <HomePage credentials={credentials} setToken={setToken} token={token}/>
                        }
                    />
                </>}

                {(!token || token === undefined || JSON.stringify(token) === "{}" || token === "") && <>

                    <Route
                        exact
                        path="/signin"
                        render={() =>
                            <LoginPage setToken={setToken}/>
                        }
                    />
                </>}

            </Switch>
        </div>
    );
}

export default App;
