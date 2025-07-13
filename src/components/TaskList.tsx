import {Box, Typography } from '@mui/material';
import TaskItem from './TaskItem';
import type { Task } from '../types';

type TaskListProps = {
  tasks: Task[];
};

function TaskList({ tasks }: TaskListProps) {
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          color: '#495057',
          fontWeight: 600,
          letterSpacing: 0.5,
          mb: 3,

          '@media (max-width: 640px)': {
            fontSize:'24px'
          },
        }}
      >
        Все задачи
      </Typography>

      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
          width: '100%',
          alignItems: 'stretch',
        }}
      >
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Box>
        
    </>
  );
}

export default TaskList;
