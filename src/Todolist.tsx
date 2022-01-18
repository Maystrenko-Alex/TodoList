import React, { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { FilterValuePropsType } from "./App";
import { EditableSpan } from "./EditableSpan";

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
  changeTaskTitle: (taskID: string, todoListID: string, title: string)=> void
  changeTodoListTitle: (todoListID: string, newTodoListTitle: string) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const addTask = (newTaskTitle: string) => props.addTask(newTaskTitle, props.todoListID)

  //   const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitleInput(e.currentTarget.value);
  //   setError(false);
  // }

  // const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => addTask();
  const setAllFilterValue = () => props.changeTodoListFilter(props.todoListID, 'all');
  const setActiveFilterValue = () => props.changeTodoListFilter(props.todoListID, 'active');
  const setCompletedFilterValue = () => props.changeTodoListFilter(props.todoListID, 'completed');
  const getBtnActiveClass = (filter: FilterValuePropsType) => props.filter === filter ? 'activeBtn' : '';
  const removeTodoList = () => props.removeTodoList(props.todoListID)
  // const errorMessage = error
  //   ? <div style={{ color: 'red' }}>Title is required!</div>
  //   : ''
  const changeTodoListTitle = (newTodoListTitle: string) =>props.changeTodoListTitle(
    props.todoListID, newTodoListTitle)
  
  const tasksJSX = props.tasks.map(task => {
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(task.id, props.todoListID, e.currentTarget.checked)
    }
    const removeTask = () => props.removeTask(task.id, props.todoListID);
    const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(task.id, props.todoListID, newTitle);
    return (
      <li key={task.id} className={task.isDone ? 'isDone' : ''}>
        <input
          type='checkbox'
          checked={task.isDone}
          onChange={changeStatus}
        />
        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
        <button onClick={removeTask}>x</button>
      </li>
    );
  })

  return (
    <div className="todo_wrapper">
      <h3>
        {/* {props.title} */}
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
        <button onClick={removeTodoList}>x</button>
      </h3>
      <AddItemForm addItem={addTask}/>
      {/* <div>
        <input
          value={titleInput}
          onChange={changeTitle}
          onKeyPress={onKeyPressAdd}
          className={error ? 'error' : ''}
        ></input>
        <button onClick={addTask}>+</button>
        {errorMessage}
      </div> */}
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
