import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserList from './component/UserList';
import {convertToTree} from './helpers/helper'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [tasksTree, setTasksTree] = useState([]);

  useEffect(() => {
    setTasksTree(() => convertToTree(tasks))
  }, [tasks])

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
        removeSublist({tasks: tasks, id: tasks[i].id});
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

  const setUp = (id, parentId) => {
    const cloneTasks = [...tasks];
    
    for(let i = 0 ; i < cloneTasks.length ; i++) 
    {
      cloneTasks[i] = {...cloneTasks[i]}

      if (cloneTasks[i].id === id) {
        try {
          const taskMove = cloneTasks[i].index;
          const taskIndex = cloneTasks.findIndex(task => task.index === (taskMove-1) && task.parentId === parentId);
          const task = cloneTasks.find(task => task.index === (taskMove-1) && task.parentId === parentId);
          cloneTasks[i].index = task.index;
          cloneTasks[taskIndex].index = taskMove;
        } catch {}
      }
    }

    setTasks([...cloneTasks]);
  }

  const setDown = (id, parentId) => {
    const cloneTasks = [...tasks];
    
    for(let i = 0 ; i < cloneTasks.length ; i++) 
    {
      cloneTasks[i] = {...cloneTasks[i]}

      if (cloneTasks[i].id === id) {
        try {
          const taskMove = cloneTasks[i].index;
          const taskIndex = cloneTasks.findIndex(task => task.index === (taskMove+1) && task.parentId === parentId);
          const task = cloneTasks.find(task => task.index === (taskMove+1) && task.parentId === parentId);
          cloneTasks[i].index = task.index;
          cloneTasks[taskIndex].index = taskMove;
        } catch{}
      }
    }
  
    setTasks([...cloneTasks]);
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
