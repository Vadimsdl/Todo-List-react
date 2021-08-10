import React, {useState} from 'react';
import UserList from './component/UserList';
import Cuntent from './context/Content'
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

  const removeSublist = ({tasks, id, parentId = null}) => {
    return tasks.map(task => {
      
      if (!!parentId) {
        if (task.id === id) {
          return {...task, sublist: [] };
        } else return {...task, sublist: removeSublist({tasks: task.sublist, id, parentId})};  
      } else {

        if (task.id === id) {
         
          return {...task};
        } else return {...task, sublist: removeSublist({tasks: task.sublist, id})}; 
      }
    });
  }

  const deleteItems = (id, parentId = null) => {
    setTasks(tasks => removeSublist({tasks, id, parentId}));
    console.log(tasks)
  }

  return (
    <div className="App">
      <UserList 
      tasks={tasks}
      setTasks={setTasks}
      addListElem={setItems}
      removeSublist={deleteItems}
      />
    </div>
  );
}

export default App;
