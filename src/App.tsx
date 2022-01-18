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
    [todoListsID_1] : [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false }
    ],
    [todoListsID_2] : [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Water", isDone: false },
      { id: v1(), title: "Beer", isDone: true }
    ]
  })
  
  
  const addTask = (title: string, todoListID: string) => {
    const copyTasks = {...tasks}
    copyTasks[todoListID] = [{id: v1(), title: title, isDone: false}, ...copyTasks[todoListID]]
    //copyTasks[todoListID] = [{id: v1(), title: newTitle, isDone: false}, ...tasks[todoListID]]
    setTasks(copyTasks)
  }
  
  const removeTask = (taskID: string, todoListID: string) => {
    const copyTasks = {...tasks}  
    copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
    setTasks(copyTasks)
    // setTasks({...copyTasks, [todoListID]: copyTask[todoListID].filter(t => t.id !== taskID) })
  }
  
  const changeTaskStatus = (taskID: string, todoListID: string, isDoneNew: boolean) => {
    // setTasks(tasks.map(t => t.id === taskId ? { ...t, isDone: isDoneNew } : t));
    const copyTasks = {...tasks}
    copyTasks[todoListID] = copyTasks[todoListID].map(t => (taskID === t.id) ? {...t, isDone: isDoneNew} : t)
    setTasks(copyTasks)
  }

  const changeTodoListFilter = (todoListID: string, filter: FilterValuePropsType) => setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
  
  const removeTodoList = (todoListID: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    const copyTasks = {...tasks}
    delete copyTasks[todoListID]
    setTasks(copyTasks)
  }
  
  const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuePropsType): Array<TaskType> => {
    if (filter === 'completed') {
      return tasks.filter(t=>t.isDone)
    }
    if (filter === 'active') {
      return tasks.filter(t => !t.isDone)
    }
    return tasks;
  }
  const addTodoList = (newTodoListTitle: string) => {
    const newTodoListID = v1();
    setTodoLists([...todoLists, {id: newTodoListID, title: newTodoListTitle, filter: 'all'}])
    setTasks({...tasks, [newTodoListID] : []})
  }

  const changeTaskTitle = (taskID: string, todoListID: string, title: string) => {
    // setTasks(tasks.map(t => t.id === taskId ? { ...t, isDone: isDoneNew } : t));
    const copyTasks = {...tasks}
    copyTasks[todoListID] = copyTasks[todoListID].map(t => (taskID === t.id) ? {...t, title } : t)
    setTasks(copyTasks)
  } 
  const changeTodoListTitle = (todoListID: string, newTitle: string)=> {
    debugger
    setTodoLists(todoLists.map( t=> t.id === todoListID ? {...t, title: newTitle} : t))
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
      <Todolist
        key={tl.id}
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
    )
  })



  // let tasksForRender = {...tasks}.map()

  // if (todoLisfilter === 'active') {
  //   tasksForRender = tasksForRender.filter(t => t.isDone === false)
  // }
  // if (filter === 'completed') {
  //   tasksForRender = tasksForRender.filter(t => t.isDone === true)
  // }

  
  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoListsComps}
    </div>
  );
}

export default App;
