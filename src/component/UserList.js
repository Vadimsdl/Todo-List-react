import React, { useState } from 'react';
import Sublist from './Sublist';

function UserList({tasks, addListElem, id = null, deleteSublist, removeTask, setUp, setDown}) {
	const [getValue, setValue] = useState('');
	const [getIndex, setIndex] = useState(0);
	let arr = [];

	const convertToTree = (tasks) => {
		let treeTasks = tasks;
		treeTasks.forEach(task => {
			if (!!task.parentId) {

				treeTasks.filter(treechild => {
					if (treechild.id === task.parentId) {
						treechild.sublist.push(task);
						return treechild === task;
					}
				});
				return;
			} 
		});
		console.log(treeTasks);
		return treeTasks;
  }

	const changeAddTask = (e) => { 
		setValue(e.target.value);
	}

	const clickAddTask = () => {
		addListElem({parentId: id, title: getValue, index: getIndex});
		setIndex(index => index+=1);
		setValue('');
	}

	return (
		<ul className="items-li">
			{convertToTree(tasks).map((task, index) => {
					return (
						<Sublist 
						key={index}
						taskTitle={task.title}
						task={task}
						index={index}
						tasks={tasks}
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