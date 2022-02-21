import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { TaskType, Todolist } from './Todolist';

type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuePropsType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

export type FilterValuePropsType = 'all' | 'active' | 'completed'
function App() {
  const todoListsID_1 = v1();
  const todoListsID_2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListsID_1, title: 'What to learn', filter: 'all' },
    { id: todoListsID_2, title: 'What to buy', filter: 'all' }
  ])
  const [tasks, setTasks] = useState<TaskStateType>({
    [todoListsID_1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false }
    ],
    [todoListsID_2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Water", isDone: false },
      { id: v1(), title: "Beer", isDone: true }
    ]
  })


  const addTask = (title: string, todoListID: string) => {
    const copyTasks = { ...tasks }
    copyTasks[todoListID] = [{ id: v1(), title: title, isDone: false }, ...copyTasks[todoListID]]
    setTasks(copyTasks)
  }

  const removeTask = (taskID: string, todoListID: string) => {
    const copyTasks = { ...tasks }
    copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
    setTasks(copyTasks)
  }

  const changeTaskStatus = (taskID: string, todoListID: string, isDoneNew: boolean) => {
    const copyTasks = { ...tasks }
    copyTasks[todoListID] = copyTasks[todoListID].map(t => (taskID === t.id) ? { ...t, isDone: isDoneNew } : t)
    setTasks(copyTasks)
  }

  const changeTodoListFilter = (todoListID: string, filter: FilterValuePropsType) => setTodoLists(todoLists.map(tl => tl.id === todoListID ? { ...tl, filter } : tl))

  const removeTodoList = (todoListID: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    const copyTasks = { ...tasks }
    delete copyTasks[todoListID]
    setTasks(copyTasks)
  }

  const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuePropsType): Array<TaskType> => {
    if (filter === 'completed') {
      return tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
      return tasks.filter(t => !t.isDone)
    }
    return tasks;
  }
  const addTodoList = (newTodoListTitle: string) => {
    const newTodoListID = v1();
    setTodoLists([...todoLists, { id: newTodoListID, title: newTodoListTitle, filter: 'all' }])
    setTasks({ ...tasks, [newTodoListID]: [] })
  }

  const changeTaskTitle = (taskID: string, todoListID: string, title: string) => {
    const copyTasks = { ...tasks }
    copyTasks[todoListID] = copyTasks[todoListID].map(t => (taskID === t.id) ? { ...t, title } : t)
    setTasks(copyTasks)
  }
  const changeTodoListTitle = (todoListID: string, newTitle: string) => {
    debugger
    setTodoLists(todoLists.map(t => t.id === todoListID ? { ...t, title: newTitle } : t))
  }

  // const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuePropsType): Array<TaskType> => {
  //   switch (filter) {
  //     case 'completed':
  //       return tasks.filter(t => t.isDone)
  //     case 'active':
  //       return tasks.filter(t => !t.isDone)
  //     default: 
  //       return tasks
  //   }
  // }
  const todoListsComps = todoLists.map(tl => {
    return (
      <Grid item 
        key={tl.id}>
        <Paper elevation={8}
          style={{
            padding: '20px',
            marginLeft: '20px'
          }}>
          <Todolist
            todoListID={tl.id}
            title={tl.title}
            tasks={getTasksForRender(tasks[tl.id], tl.filter)}
            filter={tl.filter}
            addTask={addTask}
            removeTask={removeTask}
            changeTodoListFilter={changeTodoListFilter}
            removeTodoList={removeTodoList}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        </Paper>
      </Grid>
    )
  })

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar style={{justifyContent: 'space-between'}} >
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6" >
            TodoLists
          </Typography>
          <Button color='inherit' variant={'outlined'}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container  justifyContent={'center'} style={{padding: '15px'}}>
          <Grid item>
            <AddItemForm addItem={addTodoList} />
          </Grid>
        </Grid>
        <Grid container spacing={5} justifyContent={'center'}>
          {/* <div className={'todo_wrapper'}> */}
            {todoListsComps}
          {/* </div> */}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
