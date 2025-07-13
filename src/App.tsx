import { Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import Header from './components/Header'
import './styles/index.css'
import { Container } from "@mui/material";
import type { Task } from './types';
import { useState } from 'react';

function App () {

  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <>
      <Header onAddTask={handleAddTask}/>
      <Container disableGutters sx={{
        maxWidth:'1440px', 
        px: 0,
        '@media (max-width: 1280px)': {
          px:20,
          maxWidth:'100%', 
        },

        '@media (max-width: 640px)': {
          px:10,
          maxWidth:'100%', 
        },

        '@media (max-width: 440px)': {
          px:5,
        },
      }
      }>
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} />}/>
          <Route path="/task/:id" element={<TaskDetails tasks={tasks} onUpdate={updateTask} />}/>
        </Routes>
      </Container>
    
    </>
  )
}

export default App;