import { Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography } from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
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
  changeTaskTitle: (taskID: string, todoListID: string, title: string) => void
  changeTodoListTitle: (todoListID: string, newTodoListTitle: string) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export const Todolist = (props: PropsType) => {

  const addTask = (newTaskTitle: string) => props.addTask(newTaskTitle, props.todoListID);
  const setAllFilterValue = () => props.changeTodoListFilter(props.todoListID, 'all');
  const setActiveFilterValue = () => props.changeTodoListFilter(props.todoListID, 'active');
  const setCompletedFilterValue = () => props.changeTodoListFilter(props.todoListID, 'completed');
  const getBtnActiveClass = (filter: FilterValuePropsType) => props.filter === filter ? 'activeBtn' : '';
  const removeTodoList = () => props.removeTodoList(props.todoListID);
  // const errorMessage = error
  //   ? <div style={{ color: 'red' }}>Title is required!</div>
  //   : ''
  const changeTodoListTitle = (newTodoListTitle: string) => props.changeTodoListTitle(
    props.todoListID, newTodoListTitle);

  const tasksJSX = props.tasks.map(task => {
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(task.id, props.todoListID, e.currentTarget.checked)
    }
    const removeTask = () => props.removeTask(task.id, props.todoListID);
    const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(
      task.id, props.todoListID, newTitle);

    return (
      <ListItem
        divider
        disableGutters
        key={task.id}
        style={{
          display: 'flex',
          justifyContent: 'space-between',

        }} >
        <div>
          <Checkbox
            color={'primary'}
            size={"small"}
            checked={task.isDone}
            onChange={changeStatus}
            style={{ marginRight: '15px' }}
          />
          <EditableSpan
            title={task.title}
            changeTitle={changeTaskTitle}
            className={task.isDone ? 'isDone' : ''} />
        </div>
        <IconButton onClick={removeTask}>
          <HighlightOff color={'secondary'} fontSize={'small'} />
        </IconButton>
      </ListItem>
    );
  })

  return (
    <div>
      <Typography
        variant={'h5'}
        align={'center'}>
        {/* {props.title} */}
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
        <IconButton onClick={removeTodoList} >
          <HighlightOff fontSize='small' />
        </IconButton>
      </Typography>
      <AddItemForm addItem={addTask} />
      <List style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100% !inherit'
      }}>
        {tasksJSX}
      </List>
      <div>
        <ButtonGroup
          variant="contained"
          size='small'
          disableElevation
          fullWidth
        >
          <Button
            color={props.filter === 'all' ? 'secondary' : 'primary'}
            className={getBtnActiveClass('all')}
            onClick={setAllFilterValue}>All</Button>
          <Button
            // variant="contained"
            color={props.filter === 'active' ? 'secondary' : 'primary'}
            className={getBtnActiveClass('active')}
            onClick={setActiveFilterValue}>Active</Button>
          <Button
            // variant="contained"
            color={props.filter === 'completed' ? 'secondary' : 'primary'}
            className={getBtnActiveClass('completed')}
            onClick={setCompletedFilterValue}>Completed</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
