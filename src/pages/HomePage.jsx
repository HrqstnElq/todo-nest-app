import React from "react";
import TodoForm from "../components/TodoForm";
import "./HomePage.css";

export default function HomePage() {
	const logoutClickHandler = () => {
		window.localStorage.removeItem("todo-nest-token");
		window.location.reload();
	};

	return (
		<div className="home-page">
			<button onClick={logoutClickHandler} className="btn-logout">
				<i className="fas fa-sign-out-alt"></i>
			</button>
			<TodoForm />
		</div>
	);
}
