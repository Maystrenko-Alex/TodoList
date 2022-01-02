import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterValuePropsType = 'all' | 'active' | 'completed'
function App() {

  const todoListTitle: string = "What to learn";

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false }
  ])

  // let addTask = (value: string) => {
  //   let newTask = [...tasks];
  //   const taskNew = { id: v1(), title: value, isDone: false};

  //   return setTasks(newTask.push(taskNew));
  // }

  let [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTask = (newTitle: string) => {
    const newTask = {
        id: v1(),
        title: newTitle.trim(),
        isDone: false
      }
      setTasks([newTask, ...tasks])
    }
  
  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  let tasksForRender = tasks
  if (filter === 'active') {
    tasksForRender = tasksForRender.filter(t => t.isDone === false)
  }
  if (filter === 'completed') {
    tasksForRender = tasksForRender.filter(t => t.isDone === true)
  }

  const changeFilter = (filter: FilterValuePropsType) => {
    setFilter(filter)
  }
  return (
    <div className="App">
      <Todolist
        title={todoListTitle}
        tasks={tasksForRender}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
