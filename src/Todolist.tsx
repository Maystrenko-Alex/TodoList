import React, { ChangeEvent, MouseEvent, KeyboardEvent, useState } from "react";
import { FilterValuePropsType } from "./App";

type PropsType = {
  title: string,
  tasks: Array<TaskType>
  filter: FilterValuePropsType
  todoListID: string
  removeTask: (taskID: string, todoListID: string) => void
  removeTodoList: (todoListID: string) => void
  changeTodoListFilter: (todoListID: string, filter: FilterValuePropsType) => void
  addTask: (title: string, todoListID: string) => void
  changeTaskStatus: (taskID: string, todoListID: string, isDoneNew: boolean) => void
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
      props.addTask(trimmedTitleInput, props.todoListID);
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
  const setAllFilterValue = () => props.changeTodoListFilter(props.todoListID, 'all');
  const setActiveFilterValue = () => props.changeTodoListFilter(props.todoListID, 'active');
  const setCompletedFilterValue = () => props.changeTodoListFilter(props.todoListID, 'completed');
  const getBtnActiveClass = (filter: FilterValuePropsType) => props.filter === filter? 'activeBtn' : '';
  const removeTodoList = () => props.removeTodoList(props.todoListID)

  const errorMessage = error
    ? <div style={{ color: 'red' }}>Title is required!</div>
    : ''

  const tasksJSX = props.tasks.map(task => {
    debugger
    const changeStatus = (e: ChangeEvent<HTMLInputElement>)=> {
      props.changeTaskStatus(task.id, props.todoListID, e.currentTarget.checked) 
    }
    const removeTask = () => props.removeTask(task.id, props.todoListID);
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
      <h3>
        {props.title}
        <button onClick={removeTodoList}>x</button>  
      </h3>
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
