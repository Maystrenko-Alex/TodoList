import React from "react";
import { FilterValuePropsType } from "./App";

type PropsType = {
  title: string,
  tasks: Array<TaskType>
  removeTask: (id: number) => void
  changeFilter: (filter: FilterValuePropsType) => void
}

export type TaskType = {
  id: number,
  title: string,
  isDone: boolean
}

export const Todolist = (props: PropsType) => {
  const tasksJSX = props.tasks.map(task => {
    return (
      <li key={task.id}>
        <input 
          type="checkbox" 
          checked={task.isDone} />{task.title}
        <button onClick={()=>props.removeTask(task.id)}>x</button>
      </li>
    );
  })
  
  return (
    <div>
      <h3>{props.title}</h3>
      <input type="text"></input>
      <button>+</button>
      <ul>
        {tasksJSX}
      </ul>
      <div>
        <button onClick={()=>props.changeFilter('all')}>All</button>
        <button onClick={()=>props.changeFilter('active')}>Active</button>
        <button onClick={()=>props.changeFilter('completed')}>Completed</button>
      </div>
    </div>

  );
}
