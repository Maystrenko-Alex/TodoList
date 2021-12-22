import React from "react";
type PropsType = {
  title: string,
  tasks: Array<TaskType>
}

type TaskType = {
  id: number,
  title: string,
  isDone: boolean
}

export const Todolist = (props: PropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <input type="text"></input>
      <button>+</button>
      <ul>
        <li><input type="checkbox" checked={props.tasks[0].isDone} />{props.tasks[0].title}<button>x</button></li>
        <li><input type="checkbox" checked={props.tasks[1].isDone} />{props.tasks[1].title}<button>x</button></li>
        <li><input type="checkbox" checked={props.tasks[2].isDone} />{props.tasks[2].title}<button>x</button></li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>

  );
}