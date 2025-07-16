import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from '../models/taskSlice';
import type { RootState } from '../../app/store';
import { TextField, MenuItem, Button, Stack, Typography, Box, Paper } from '@mui/material';
import type {TaskStatus, TaskCategory, TaskPriority } from '../../entities/task/types';

const categories = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'] as const;
const statuses = ['To Do', 'In Progress', 'Done'] as const;
const priorities = ['Low', 'Medium', 'High'] as const;

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const task = useSelector((state: RootState) =>
    state.tasks.find(task => task.id === id)
  );

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: TaskCategory;  // <-- Используем полный тип
    status: TaskStatus;
    priority: TaskPriority;
  }>({
    title: '',
    description: '',
    category: 'Feature',  // Значение по умолчанию, но тип остается TaskCategory
    status: 'To Do',
    priority: 'Low'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        category: task.category,
        status: task.status,
        priority: task.priority
      });
    }
  }, [task]);

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    if (!task) return;
    
    const updatedTask = {
      ...task,
      ...formData
    };

    dispatch(updateTask(updatedTask));
    navigate('/');
  };

  if (!task) {
    return <Typography variant="h6">Задача не найдена</Typography>;
  }

  return (
    <Paper sx={{ border: '2px solid #495057', borderRadius: 4, maxWidth: 600, mx: 'auto', mt: 4, p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Редактирование задачи
      </Typography>

      <Stack spacing={2} direction="column">
        <TextField
          label="Заголовок"
          fullWidth
          value={formData.title}
          onChange={handleChange('title')}
        />
        <TextField
          label="Описание"
          fullWidth
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange('description')}
        />
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            select
            label="Категория"
            value={formData.category}
            onChange={handleChange('category')}
            sx={{ flex: 1, minWidth: 150 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Статус"
            value={formData.status}
            onChange={handleChange('status')}
            sx={{ flex: 1, minWidth: 150 }}
          >
            {statuses.map((st) => (
              <MenuItem key={st} value={st}>
                {st}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Приоритет"
            value={formData.priority}
            onChange={handleChange('priority')}
            sx={{ flex: 1, minWidth: 150 }}
          >
            {priorities.map((pr) => (
              <MenuItem key={pr} value={pr}>
                {pr}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button onClick={() => navigate('/')}>
            Отмена
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Сохранить
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

export default TaskDetails;