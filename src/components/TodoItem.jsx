/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ClassNames from "classnames";
import "./TodoItem.css";
import {Axios} from "../Axios";
import Popup from "reactjs-popup";

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
	const contentStyle = {
		maxWidth: "500px",
		width: "90%"
	};
	const editTodoHandler = (e) => {
		e.preventDefault();
		const content = e.target.querySelector("#editContent").value;
		Axios.put(
			"/user/todo",
			{	_id: todoItem._id, 
				content: content 
			},
			{
				headers: {
					Authorization: "Bearer " + window.localStorage.getItem("todo-nest-token"),
				},
			}
		).then((r) => {
			console.log(todoItem._id, content, r)
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
				{
					todoItem.isComplete || 
					<Popup
						trigger={<i className="btn btn--edit far fa-edit"></i>}
						formEdit
						contentStyle={contentStyle}
					>
						{close => (
							<div className="formEdit">
								<center>Edit content</center>
								<div className="content">
									<form onSubmit={editTodoHandler} className="todo__form" autoComplete="off">
										<input className="form__input" id="editContent" type="text" required />
										<button className="form__button--add">
											<i className="fas fa-edit"></i>
										</button>
									</form>
									<br />
								</div>
								<center><button className="close" onClick={close}>Cancel</button></center>
							</div>
						)}
					</Popup>
				}
				<i onClick={() => deleteHandler(todoItem._id)} className="btn btn--delete far fa-trash "></i>
			</div>
		</div>
	);
}

