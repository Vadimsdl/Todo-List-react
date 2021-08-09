import React, { useState } from 'react';
import UserList from './UserList'

function Sublist(props) {
  const [sublistInput, setSublistInput] = useState([]);
  const idx = props.index;
  const valu = props.val;
  let tasks = props.task.sublist;

  function clickAddInput(id, e) {
    // setSublistInput([
    //   ...sublistInput,
    //   id
    // ]);
    // //<UserList/>
  }

  const clickRemoveTask = (value, index) => () => {
    props.setTask(prevIndexes => [...prevIndexes.filter((item, id) => id !== index)]);
  }

  function clickRemoveSublist (e) {
    //console.log(props.taskName, valu);
    //props.addRemoveElement(props.arr, 'remove');
  }

  function clickUp(e, id, val) {
    if (id-1 !== -1) {
      const text = props.tasks.splice(id-1, 1, val);
      props.tasks.splice(id, 1, text[0]);
      props.setTasks([...props.tasks]);
      console.log(id); 
      tasks = props.task;
        //e.target.classList.toggle('hidden');
    }
    
  }

  function clickDown(id, val) {
    const text = props.tasks.splice(id+1, 1, val);
    props.tasks.splice(id, 1, text[0]);
    props.setTasks([...props.tasks]);
    tasks = props.task;
  }

  return (
    <li >
      <button type="button" onClick={(e) => clickUp(e, idx, valu)}>Up</button>
      <button type="button" onClick={() => clickDown(idx, valu)}>Down</button>
      <span>{valu}</span>
      <button type="button" className="add-btn-sublist" onClick={() => clickAddInput(props.id)}>Add Sublist</button>
      <button type="button" onClick={clickRemoveTask(valu, idx)}>Delete</button>
      <button type="button" onClick={clickRemoveSublist}>Remove Sublist</button>
        <UserList
          valu={valu}
          addListElem={props.addListElem}
          tasks={tasks}
          setTasks={props.setTasks}
          id={props.id}
        />

    </li>
  );
}

export default Sublist;