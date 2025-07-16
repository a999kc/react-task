import { Route, Routes } from 'react-router-dom';
import TaskList from '../features/ui/TaskList';
import TaskDetails from '../features/ui/TaskDetails';
import Header from '../features/ui/Header';
import '../shared/styles/normalize.css';
import { Container } from '@mui/material';
import type { Task } from '../entities/task/types';
import { useDispatch, } from 'react-redux';
import { addTask,  } from '../features/models/taskSlice';
// import type { RootState } from '../app/store'; 

function App() {

  const dispatch = useDispatch();
  // const tasks = useSelector((state: RootState) => state.tasks); 

  const handleAddTask = (task: Task) => {
    dispatch(addTask(task)); 
  };

  // const handleUpdateTask = (updatedTask: Task) => {
  //   dispatch(updateTask(updatedTask)); 
  // };

  return (
    <>
      <Header onAddTask={handleAddTask} />
      <Container
        sx={{
          maxWidth: 'lg',
          px: { xs: 2, sm: 3, md: 5 },
        }}
      >

        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
