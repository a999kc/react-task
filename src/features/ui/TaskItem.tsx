import { Box, Card, CardContent, CardHeader, Chip, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../models/taskSlice';
import type { Task } from '../../entities/task/types';

type Props = {
  task: Task;
};


const statusColors = {
  'To Do': '#AEAEB2',
  'In Progress': '#FFCC00',
  'Done': '#30D158'
} as const;

const categoryColors = {
  'Bug': '#FF3B30',
  'Feature': '#34C759',
  'Documentation': '#007AFF',
  'Refactor': '#AF52DE',
  'Test': '#FF9500'
} as const;

const priorityColors = {
  'High': '#FF453A',
  'Medium': '#e8590c',
  'Low': '#5BD424'
} as const;

function TaskItem({ task }: Props) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: '2px solid #495057',
      borderRadius: 4
    }}>
      <CardHeader 
        title={task.title} 
        sx={{ pb: 0 }}
        subheader={new Date(task.createdAt).toLocaleDateString()} // Добавили дату
      />
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {task.description}
          </Typography>
        )}
        
        <Box sx={{ mt: 'auto' }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            <Chip 
              label={task.category}
              sx={{ 
                backgroundColor: categoryColors[task.category],
                color: 'white',
                fontWeight: 600
              }} 
            />
            <Chip 
              label={task.status}
              sx={{ 
                backgroundColor: statusColors[task.status],
                color: 'white',
                fontWeight: 600
              }} 
            />
            <Chip 
              label={task.priority}
              sx={{ 
                backgroundColor: priorityColors[task.priority],
                color: 'white',
                fontWeight: 600
              }} 
            />
          </Stack>

          <Stack direction="row" spacing={1}>
            <Button
              component={Link}
              to={`/task/${task.id}`}
              variant="outlined"
              fullWidth
              sx={{
                border: '2px solid #495057',
                color: '#495057',
                '&:hover': {
                  borderColor: '#e8590c'
                }
              }}
            >
              Редактировать
            </Button>
            <Button
              onClick={handleDelete}
              variant="outlined"
              fullWidth
              sx={{
                border: '2px solid #FF3B30',
                color: '#FF3B30',
                '&:hover': {
                  backgroundColor: '#FF3B30',
                  color: 'white'
                }
              }}
            >
              Удалить
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TaskItem;