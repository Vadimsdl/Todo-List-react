import React, {useState} from 'react';
import UserList from './component/UserList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useState([]);

	const addListElem = ({tasks,  id = null, title}) => {

    if (!!id) {
      return tasks.map(task => {
        if (task.id === id) {
          return {...task, sublist: [...task.sublist, {title: title, id: uuidv4(), parentId: id, sublist: []}]};
        } else return {...task, sublist: addListElem({tasks: task.sublist, id, title})}; 
      })
    } else return [...tasks, {title: title, id: uuidv4(), parentId: id, sublist: []}]
  }

  const setItems = ({id = null, title}) => {
    setTasks(tasks => addListElem({tasks, id, title}))
  }

  console.log(tasks)

  return (
    <div className="App">
      <UserList 
      tasks={tasks}
      setTasks={setTasks}
      addListElem={setItems}

      />
    </div>
  );
}

export default App;
