import React, { useState } from 'react';
import './UserList.css';
import Sublist from './Sublist';
import { v4 as uuidv4 } from 'uuid';

function UserList({tasks, setTasks, addListElem, subl, oldTask=[], valu, id = null}) {
	
	const changeTask = (e) => { 

		if (e.target.value) {
			addListElem({id, title: e.target.value});
			e.target.value = '';
		}

	}

//  console.log(tasks)

	return (
		<ul>
			{tasks.map((task, index) => {
				// console.log(tasks)
					return (
						<Sublist 
						key={index}
						val={task.title}
						task={task}
						index={index}
						tasks={tasks}
						setTasks={setTasks}
						addListElem={addListElem}
						id={task.id}

						//action={addRemoveElement}
						/>
					)
				}
			)}
			<li>
				<input
					type="text"
					name="task-name"
					className="task-name"
					id="task-name"
					onBlur = {changeTask}
				/>
				<button type="button" className="add-btn" >Add</button>
			</li>
		</ul>
	);
}

export default UserList;