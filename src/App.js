import React, {useState} from 'react';
import UserList from './component/UserList';
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

  const setItems = ({parentId = null, title, index}) => {
    setTasks([...tasks, {
      index: index,
      title: title,
      id: uuidv4(),
      parentId: parentId,
      sublist: []
    }]);
    
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
    // console.log(moveUp({tasks, id}));
    setTasks(tasks => [...moveUp({tasks, id})]);
  }
  
  const moveUp = ({tasks, id}) => {
   /*  let todoIndex = null;

    for(let i = 0; i < tasks.length; i++){
      if (tasks[i].id === id && todoIndex === null) {
        todoIndex = i
        break;
      } else if(tasks[i].sublist && todoIndex === null){
        moveUp({tasks: tasks[i].sublist, id})
      }
    }

    if (todoIndex !== null) {
      const [text] = tasks.splice(todoIndex-1, 1, tasks[todoIndex]);
      const [test] = tasks.splice(todoIndex, 1, text);
    }
  
    return [...tasks] */
    console.log(tasks)
    tasks.find( (task, indx, taskArr) => {
      console.log(task, id);
      if (task.id === id) {
        array_move(taskArr, indx, indx-1);
        return false;
      } else if(task.sublist > 0){
         task.sublist = moveUp({task: task.sublist, id});
         return true;
      }
    });
    return tasks;
  }

  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

  const setDown = (id) => {
    setTasks(tasks => moveDown({tasks, id}));
  }
  
  const moveDown = ({tasks, id}) => {
    // const newTasks = tasks;
    // let count = 0;
    // console.log(newTasks, tasks);
    // tasks.map((task, idx) => { 
    //   console.log(task, '-', idx);
    //   console.log(count, 'count')
    //   if (task.id === id) {
    //       const text = newTasks.splice(idx+1, 1, task);
    //       console.log(text,idx);
    //       newTasks.splice(idx-1, 1, text[0]);
    //       count =+1;
    //       console.log(newTasks, 'newTasks')

    //     return task;
    //   } else return {...task, sublist: moveDown({tasks: task.sublist, id})};
    // })
    // return newTasks;
  }

  return (
    <div className="App">
      <UserList 
      tasks={tasks}
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
