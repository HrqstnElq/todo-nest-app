import React from "react";
import {Axios} from "../Axios";
import "./LoginForm.css";

export default function LoginForm() {
	const onSubmitHandler = (e) => {
		e.preventDefault();

		const loginData = {
			username: e.target.querySelector("#username").value,
			password: e.target.querySelector("#password").value,
		};

		Axios.post("/user/login", loginData)
			.then((res) => {
				if (res.data.token) {
					window.localStorage.setItem("todo-nest-token", res.data.token);
					window.location.reload();
				} else {
					alert(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<form onSubmit={onSubmitHandler} className="form" autoComplete="off">
			<div className="form-control">
				<label htmlFor="username">USERNAME</label>
				<input type="text" id="username" name="username" required />
			</div>
			<div className="form-control">
				<label htmlFor="password">PASSWORD</label>
				<input type="password" id="password" name="password" required />
			</div>
			<button className="button">LOGIN</button>
		</form>
	);
}
