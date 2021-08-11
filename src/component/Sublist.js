import React from 'react';
import UserList from './UserList'

function Sublist({index, taskTitle, task, setTasks, deleteSublist, tasks, addListElem, removeTask, setUp, setDown }) {
  let getTasks = task.sublist;

  const clickRemoveTask = (task) => () => {
    removeTask(task.id);
  }

  const clickRemoveSublist = (task) => () => {
    deleteSublist(task.id);
  }

  function clickUp(id, val) {

    if (id-1 !== -1) {
      setUp(task.id);
    }
  }
console.log(tasks)
  function clickDown(id, val) {
  
    if ( id < tasks.length-1 ) {
      console.log(task.id, tasks.length, id);
      setDown(task.id);
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
          deleteSublist={deleteSublist}
          removeTask={removeTask}
          setUp={setUp}
          setDown={setDown}
        />
    </li>
  );
}

export default Sublist;