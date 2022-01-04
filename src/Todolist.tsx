import React, { ChangeEvent, MouseEvent, KeyboardEvent, useState } from "react";
import { FilterValuePropsType } from "./App";

type PropsType = {
  title: string,
  tasks: Array<TaskType>
  filter: FilterValuePropsType
  removeTask: (id: string) => void
  changeFilter: (filter: FilterValuePropsType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export const Todolist = (props: PropsType) => {
  const [titleInput, setTitleInput] = useState<string>(''); // state
  const [error, setError] = useState<true | false>(false); //state

  const addTask = () => {
    const trimmedTitleInput = titleInput.trim();
    if (trimmedTitleInput) {
      props.addTask(trimmedTitleInput);
    } else {
      setError(true);
    }
    setTitleInput('');
  }

  const onKeyPressAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.currentTarget.value);
    setError(false);
  }
  
  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => addTask();
  const setAllFilterValue = () => props.changeFilter('all');
  const setActiveFilterValue = () => props.changeFilter('active');
  const setCompletedFilterValue = () => props.changeFilter('completed');
  const getBtnActiveClass = (filter: FilterValuePropsType) => props.filter === filter? 'activeBtn' : '';

  const errorMessage = error
    ? <div style={{ color: 'red' }}>Title is required!</div>
    : ''
  const tasksJSX = props.tasks.map(task => {
    const changeStatus = (e: ChangeEvent<HTMLInputElement>)=> {
      props.changeTaskStatus(task.id, e.currentTarget.checked) 
    }
    const removeTask = () => props.removeTask(task.id);
    return (
      <li key={task.id} className={task.isDone ? 'isDone' : ''}>
        <input 
          type='checkbox' 
          checked={task.isDone} 
          onChange={changeStatus}
          />{task.title}
        <button onClick={removeTask}>x</button>
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
        className={error ? 'error' : ''}
      ></input>
      <button onClick={onClickHandler}>+</button>
      {errorMessage}
      <ul>
        {tasksJSX}
      </ul>
      <div>
        <button
          className={getBtnActiveClass('all')}
          onClick={setAllFilterValue}>All</button>
        <button
          className={getBtnActiveClass('active')}
          onClick={setActiveFilterValue}>Active</button>
        <button
          className={getBtnActiveClass('completed')}
          onClick={setCompletedFilterValue}>Completed</button>
      </div>
    </div>

  );
}
