import React, {useEffect, useState} from "react";
import "./TodoList.scss";
import TodoDisplay from "./TodoDisplay";
import uuid from "react-uuid";
import axios from "axios";
const TodoList = () => {
	const [todoText, settodoText] = useState();
	const [todoLists, settodoLists] = useState([]);

	useEffect(async () => {
		try {
			let response = await axios.get(
				"https://todo-list-express.santhosh-reddyr.repl.co"
			);
			if (response.status === 200 || response.status === 201) {
				settodoLists(response.data);
			}
		} catch (err) {
			console.log("Error", err);
		}
	}, []);

	const btnHandler = async () => {
		try {
			let response = await axios.post(
				"https://todo-list-express.santhosh-reddyr.repl.co/todo",
				{
					todo: {
						text: todoText,
						completed: false,
						id: uuid(),
					},
				}
			);
			if (response.status === 200 || response.status === 201) {
				settodoLists(response.data);
				settodoText("");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			let response = await axios.delete(
				`https://todo-list-express.santhosh-reddyr.repl.co/todo/${id}`
			);
			if (response.status === 200 || response.status === 201) {
				settodoLists(response.data);
				settodoText();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const checkboxHandler = async (id) => {
		try {
			let response = await axios.post(
				"https://todo-list-express.santhosh-reddyr.repl.co/todo/edit",
				{
					id: id,
				}
			);
			if (response.status === 200 || response.status === 201) {
				settodoLists(response.data);
			}
		} catch (error) {
			console.log("Error", error);
		}
	};

	return (
		<div className='todolist-container'>
			<div className='todo-container'>
				<h1>THINGS TO DO</h1>
				<div className='todo-component'>
					<input
						type='text'
						value={todoText}
						onChange={(e) => settodoText(e.target.value)}
						placeholder='Add New Todo'
					/>
					<button onClick={() => btnHandler()}>Add Todo</button>
				</div>
			</div>
			<div className='todolist-display'>
				{todoLists &&
					todoLists?.map((todo) => (
						<TodoDisplay
							todolist={todo}
							key={todo.id}
							deleteTodo={deleteTodo}
							checkboxHandler={checkboxHandler}
						/>
					))}
			</div>
		</div>
	);
};

export default TodoList;
