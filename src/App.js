import React, {useState} from 'react';
import UserList from './component/UserList';
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

  const convertToTree = (tasks) => {
		let map = {}, node, roots = [], i;
    let tasksClone = [...tasks];

		for (i = 0; i < tasksClone.length; i++) {
      tasksClone[i] = {...tasksClone[i]}
			map[tasksClone[i].id] = i;
			tasksClone[i].sublist = [];
		}
		
		for (i = 0; i < tasksClone.length; i++) {
			node = tasksClone[i];

			if (!!node.parentId) {
				tasksClone[map[node.parentId]].sublist.push(node);
			} else {
				roots.push(node);
			}
		}
		return roots;
  }

  let tasksTree = convertToTree(tasks);

  const setItems = ({parentId = null, title, index}) => {
    setTasks([...tasks, {
      index: index,
      title: title,
      id: uuidv4(),
      parentId: parentId,
    }]);
  }

  const deleteSublist = (id) => {
    setTasks(tasks => removeSublist({tasks, id}));
  }

  const removeSublist = ({tasks, id}) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].parentId === id) {
        removeTask({tasks: tasks, id: tasks[i].id});
        tasks.splice(i, 1);
        i--;
      }
    }
    return [...tasks];
  }

  const deleteTask = (id) => {
    setTasks(tasks => removeTask({tasks, id}));    
  }

  const removeTask = ({tasks, id}) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].parentId === id) {
        removeTask({tasks: tasks, id: tasks[i].id});
        tasks.splice(i, 1);
        i--;
      } else if (tasks[i].id === id) {
        tasks.splice(i, 1);
        i--;
      }
    }
    return [...tasks];
  }

  const setUp = (id) => {
    setTasks(tasks => [...moveUp({tasks, id})]);
  }
  
  const moveUp = ({tasks, id}) => {
    const cloneTasks = [...tasks];
    cloneTasks.forEach((task, indx, taskArr) => {
      if (task.id === id) {
        taskArr.splice(indx-1, 0, taskArr.splice(indx, 1)[0]);
      } 
    });
    return cloneTasks;
  }

  const setDown = (id) => {
    setTasks(tasks => [...moveDown({tasks, id})]);
  }
  
  const moveDown = ({tasks, id}) => {
    const cloneTasks = [...tasks];

    cloneTasks.forEach((task, indx, taskArr) => {
      if (task.id === id) {
        // taskArr.splice(indx+1, 0, taskArr.splice(indx, 1)[0]);
        let taskMove = task.index;
        task.index = taskArr[indx+1].index;
        taskArr[indx+1].index = taskMove;
        console.log(taskArr)
      }
    });
    console.log(cloneTasks);
    return cloneTasks;
  }

  return (
    <div className="App">
      <UserList 
      tasks={tasksTree}
      addListElem={setItems}
      deleteSublist={deleteSublist}
      removeTask={deleteTask}
      setUp={setUp}
      setDown={setDown}
      />
    </div>
  );
}

export default App;
