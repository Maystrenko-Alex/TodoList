import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterValuePropsType = 'all' | 'active' | 'completed'
function App() {

  const todoListTitle: string = "What to learn";

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false }
  ])

  let [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const removeTask = (taskId: number) => {
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
        removeTask={removeTask}
        changeFilter={changeFilter}
         />
    </div>
  );
}

export default App;
