import React, { ChangeEvent, MouseEvent, KeyboardEvent, useState } from "react";
import { FilterValuePropsType } from "./App";

type PropsType = {
  title: string,
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (filter: FilterValuePropsType) => void
  addTask: (title: string) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export const Todolist = (props: PropsType) => {
  const [titleInput, setTitleInput] = useState<string>(''); // state
  const addTask = () => {
    props.addTask(titleInput);
    setTitleInput('');
  }
  const onKeyPressAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitleInput(e.currentTarget.value);
  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => addTask();
  const setAllFilterValue = () => props.changeFilter('all');
  const setActiveFilterValue = () => props.changeFilter('active');
  const setCompletedFilterValue = () => props.changeFilter('completed');

  const tasksJSX = props.tasks.map(task => {
    return (
      <li key={task.id}>
        <input
          type="checkbox"
          checked={task.isDone} />{task.title}
        <button onClick={() => props.removeTask(task.id)}>x</button>
      </li>
    );
  })

  return (
    <div>
      <h3>{props.title}</h3>
      <input
        value={titleInput}
        onChange={changeTitle}
        onKeyPress={onKeyPressAdd}
      ></input>
      <button onClick={onClickHandler}>+</button>
      <ul>
        {tasksJSX}
      </ul>
      <div>
        <button onClick={setAllFilterValue}>All</button>
        <button onClick={setActiveFilterValue}>Active</button>
        <button onClick={setCompletedFilterValue}>Completed</button>
      </div>
    </div>

  );
}
