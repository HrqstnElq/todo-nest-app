import React, {useEffect, useState} from "react";
import ClassNames from "classnames";
import "./TodoForm.css";
import TodoItem from "./TodoItem";
import {Axios} from "../Axios";

export default function TodoForm() {
	//currentTag : enum : { all, done, active}
	const [currentTag, setCurrentTag] = useState("all");
	const [todoItems, setTodoItems] = useState([]);
	const [refresh, setRefresh] = useState({});

	const tagClickHandler = (tagname) => setCurrentTag(tagname);

	const addTodoHandler = (e) => {
		e.preventDefault();
		const content = e.target.querySelector("#content").value;
		Axios.post(
			"/user/todo",
			{content: content},
			{
				headers: {
					Authorization: "Bearer " + window.localStorage.getItem("todo-nest-token"),
				},
			}
		).then(() => {
			e.target.querySelector("#content").value = "";
			setRefresh({});
		});
	};

	useEffect(() => {
		Axios.get("/user/todo-list", {
			headers: {
				Authorization: "Bearer " + window.localStorage.getItem("todo-nest-token"),
			},
		})
			.then((res) => {
				let todoItems = res.data;
				if (currentTag !== "all") {
					todoItems = todoItems.filter((items) => items.isComplete === (currentTag === "done" ? true : false));
				}
				setTodoItems(todoItems);
			})
			.catch((err) => {
				window.localStorage.removeItem("todo-nest-token");
				window.location.reload();
			});
	}, [refresh, currentTag]);

	return (
		<div className="todo">
			<div className="todo__tags">
				<div className="tag" onClick={() => tagClickHandler("all")}>
					<p>All</p>
				</div>
				<div className="tag" onClick={() => tagClickHandler("active")}>
					<p>Active</p>
				</div>
				<div className="tag" onClick={() => tagClickHandler("done")}>
					<p>Done</p>
				</div>
				<div className={ClassNames("tag__bottom-bar", currentTag)}></div>
			</div>
			{currentTag !== "done" && (
				<form onSubmit={addTodoHandler} className="todo__form" autoComplete="off">
					<input className="form__input" id="content" type="text" required />
					<button className="form__button--add">
						<i className="fas fa-plus"></i>
					</button>
				</form>
			)}

			<div className="todo__items">
				{todoItems.map((todoItem) => (
					<TodoItem key={todoItem._id} todoItem={todoItem} setRefresh={setRefresh} />
				))}
			</div>
		</div>
	);
}
