import React from "react";
import "./TodoDisplay.scss";

const TodoDisplay = ({todolist, deleteTodo, checkboxHandler}) => {
	return (
		<div className='tododisplay-container'>
			<p style={{textDecoration: todolist.completed ? "line-through" : "none"}}>
				{todolist.text}
			</p>
			<div className='tododisplay-options'>
				<div className='tododisplay-left'>
					<input
						type='checkbox'
						checked={todolist.completed === true ? true : false}
						onChange={() => checkboxHandler(todolist.id)}
					/>
					<p>Completed</p>
				</div>
				<button onClick={() => deleteTodo(todolist.id)}>Delete</button>
			</div>
		</div>
	);
};

export default TodoDisplay;
