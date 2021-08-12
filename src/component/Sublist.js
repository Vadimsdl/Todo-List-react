import React from 'react';
import UserList from './UserList'

function Sublist({taskTitle, task, deleteSublist, tasks, addListElem, removeTask, setUp, setDown, getIndex, setIndex }) {
  let getTasks = task.sublist;

  return (
    <li >
      <div className="title-block">
      <span className="title-task">{taskTitle}</span>
      </div>
      <button className="btn" type="button" onClick={() => setUp(task.id)}>Up</button>
      <button className="btn" type="button" onClick={() => setDown(task.id)}>Down</button>
      <button className="btn" type="button" onClick={() => removeTask(task.id)}>Delete</button>
      <button className="btn" type="button" onClick={() => deleteSublist(task.id)}>Remove Sublist</button>
        <UserList
          addListElem={addListElem}
          tasks={getTasks}
          id={task.id}
          taskTitle={taskTitle}
          deleteSublist={deleteSublist}
          removeTask={removeTask}
          setUp={setUp}
          getIndex={getIndex}
          setDown={setDown}
          setIndex={setIndex}
        />
    </li>
  );
}

export default Sublist;