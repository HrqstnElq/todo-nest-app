import React from "react";
import ClassNames from "classnames";
import "./TodoItem.css";
import {Axios} from "../Axios";

export default function TodoItem(props) {
	const {todoItem, setRefresh} = props;
	const checkHandler = (id) => {
		Axios.put(
			`/user/todo-change-state/${id}`,
			{},
			{
				headers: {
					Authorization: "Bearer " + window.localStorage.getItem("todo-nest-token"),
				},
			}
		).then(() => {
			setRefresh({});
		});
	};

	const deleteHandler = (id) => {
		Axios.delete(`/user/todo/${id}`, {
			headers: {
				Authorization: "Bearer " + window.localStorage.getItem("todo-nest-token"),
			},
		}).then(() => {
			setRefresh({});
		});
	};

	return (
		<div className="todo-item">
			<div className="left">
				<input onClick={() => checkHandler(todoItem._id)} type="checkbox" className="item__checkbox" defaultChecked={todoItem.isComplete} />
				<div className={ClassNames("item__content", {complete: todoItem.isComplete})}>{todoItem.content}</div>
			</div>

			<div className="right">
				{todoItem.isComplete || <i className="btn btn--edit far fa-edit"></i>}
				<i onClick={() => deleteHandler(todoItem._id)} className="btn btn--delete far fa-trash "></i>
			</div>
		</div>
	);
}
