import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import HomePage from "./pages/HomePage";
import "./App.css";
import LoginPage from "./pages/LoginPage";

function App() {
	const [isLogin, setIsLogin] = useState(false);
	useEffect(() => {
		let token = window.localStorage.getItem("todo-nest-token");
		if (token) {
			// decode token
			try {
				token = jwt_decode(token);
				if (token.exp > Date.now() / 1000) {
					return setIsLogin(true);
				} else {
					setIsLogin(false);
				}
			} catch {
				setIsLogin(false);
			}
		}
	}, []);

	return <div className="app">{(isLogin && <HomePage />) || <LoginPage />}</div>;
}

export default App;
