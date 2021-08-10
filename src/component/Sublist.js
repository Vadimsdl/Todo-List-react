import React from 'react';
import UserList from './UserList'

function Sublist({index, taskTitle, task, setTasks, removeSublist, tasks, addListElem }) {
  let getTasks = task.sublist;

  const clickRemoveTask = (task) => () => {
    removeSublist(task.id);
  }

  const clickRemoveSublist = (task) => () => {
    removeSublist(task.id, tasks.id);
  }

  function clickUp(id, val) {
    
    if (id-1 !== -1) {
      const text = tasks.splice(id-1, 1, val);
      tasks.splice(id, 1, text[0]);
      setTasks([...tasks]);
      getTasks = tasks;
    }
  }

  function clickDown(id, val) {
  
    if ( id < tasks.length-1 ) {
      const text = tasks.splice(id+1, 1, val);
      tasks.splice(id, 1, text[0]);
      setTasks([...tasks]);
      getTasks = tasks;
    }
  }

  return (
    <li >
      <div className="title-block">
      <span className="title-task">{taskTitle}</span>
      </div>
      <button className="btn" type="button" onClick={() => clickUp(index, task)}>Up</button>
      <button className="btn" type="button" onClick={() => clickDown(index, task)}>Down</button>
      <button className="btn" type="button" onClick={clickRemoveTask(task)}>Delete</button>
      <button className="btn" type="button" onClick={clickRemoveSublist(task)}>Remove Sublist</button>
        <UserList
          addListElem={addListElem}
          tasks={getTasks}
          setTasks={setTasks}
          id={task.id}
          taskTitle={taskTitle}
          removeSublist={removeSublist}
        />
    </li>
  );
}

export default Sublist;