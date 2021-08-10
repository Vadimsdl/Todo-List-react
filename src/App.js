import React, {useState} from 'react';
import UserList from './component/UserList';
import Content from './context/Content'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

	const addListElem = ({tasks,  id = null, title}) => {

    if (!!id) {
      return tasks.map(task => {
        
        if (task.id === id) {
          return {...task, sublist: [...task.sublist, {title: title, id: uuidv4(), parentId: id, sublist: []}]};
        } else return {...task, sublist: addListElem({tasks: task.sublist, id, title})}; 
      });
    } else return [...tasks, {title: title, id: uuidv4(), parentId: id, sublist: []}]
  }

  const setItems = ({id = null, title}) => {
    setTasks(tasks => addListElem({tasks, id, title}));
  }

  const deleteSublist = (id) => {
    setTasks(tasks => removeSublist({tasks, id}));
  }

  const removeSublist = ({tasks, id}) => {
    return tasks.map(task => {
      if (task.id === id) {
        return {...task, sublist: []};
      } else return {...task, sublist: removeSublist({tasks: task.sublist, id})};
    });
  }

  const deleteTask = (id) => {
    setTasks(tasks => removeTask({tasks, id}));
  }

  const removeTask = ({tasks, id}) => {
    return tasks.filter(task => {
      if (task.id === id) {
        return false;
      } else {
        task.sublist = removeTask({tasks: task.sublist, id});
        return true;
      }
    });
  }

  const setUp = (id) => {
    setTasks(tasks => moveUp({tasks, id}))
    console.log(moveUp({tasks, id}))
  }
  
  const moveUp = ({tasks, id, taskNew=[]}) => {
    const p = tasks.map((task, idx) => { 
      console.log(task, 1);
      if (task.id === id) {
        const text = tasks.splice(idx-1, 1, task);
        tasks.splice(idx, 1, text[0]);
        return tasks;
      } else return {...task, sublist: moveUp({tasks: task.sublist, id})};
    })
    return p;
  }

  return (
    <div className="App">
      <UserList 
      tasks={tasks}
      setTasks={setTasks}
      addListElem={setItems}
      deleteSublist={deleteSublist}
      removeTask={deleteTask}
      setUp={setUp}
      />
    </div>
  );
}

export default App;
