import React from "react";
import {Axios} from "../Axios";
import "./LoginForm.css";

export default function RegisterForm() {
	const onSubmitHandler = (e) => {
		e.preventDefault();

		const registerData = {
			name: e.target.querySelector("#name").value,
			username: e.target.querySelector("#username").value,
			password: e.target.querySelector("#password").value,
			passwordConfirm: e.target.querySelector("#passwordConfirm").value,
		};

		Axios.post("/user/register", registerData)
			.then((res) => {
				alert(res.data.message);
				window.location.reload();
			})
			.catch((err) => {
				alert(err);
			});
	};

	return (
		<form onSubmit={onSubmitHandler} className="form" autoComplete="off">
			<div className="form-control">
				<label htmlFor="name">NAME</label>
				<input type="text" id="name" name="name" required />
			</div>

			<div className="form-control">
				<label htmlFor="username">USERNAME</label>
				<input type="text" id="username" name="username" required />
			</div>

			<div className="form-control">
				<label htmlFor="password">PASSWORD</label>
				<input type="password" id="password" name="password" required />
			</div>

			<div className="form-control">
				<label htmlFor="passwordConfirm">CONFIRM</label>
				<input type="password" id="passwordConfirm" name="passwordConfirm" required />
			</div>

			<button className="button">REGISTER</button>
		</form>
	);
}
