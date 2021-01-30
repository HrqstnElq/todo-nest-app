import React, {useState} from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function LoginPage() {
	const [form, setForm] = useState("login");

	const onChangeFormHandler = () => {
		setForm(form === "login" ? "register" : "login");
	};

	return (
		<div className="login-page">
			{(form === "login" && <LoginForm />) || <RegisterForm />}
			<p onClick={onChangeFormHandler} align="center" style={{cursor: "pointer", color: "#0984e3", textTransform: "uppercase"}}>
				{form === "login" ? "register" : "login"}
			</p>
		</div>
	);
}
