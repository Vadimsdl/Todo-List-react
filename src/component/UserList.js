import React, { useState } from 'react';
import Sublist from './Sublist';

function UserList({tasks, setTasks, addListElem, id = null, deleteSublist, removeTask, setUp, setDown}) {
	const [getValue, setValue] = useState('');

	const changeAddTask = (e) => { 
		setValue(e.target.value);
	}
	console.log(tasks);

	const clickAddTask = () => {
		addListElem({id, title: getValue});
		setValue('');
	}

	return (
		<ul className="items-li">
			{tasks.map((task, index) => {
					return (
						<Sublist 
						key={index}
						taskTitle={task.title}
						task={task}
						index={index}
						tasks={tasks}
						setTasks={setTasks}
						addListElem={addListElem}
						deleteSublist={deleteSublist}
						removeTask={removeTask}
						setUp={setUp}
						setDown={setDown}
						/>
					);
				}
			)}
			<li>
				<input
					type="text"
					name="task-name"
					className="task-name"
					id="task-name"
					value={getValue}
					onChange={changeAddTask}
				/>
				<button type="button" className="btn" onClick={clickAddTask} >Add</button>
			</li>
		</ul>
	);
}

export default UserList;