import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../models/taskSlice';
import type { Task, TaskStatus, TaskCategory, TaskPriority } from '../../entities/task/types';

const categories: TaskCategory[] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
const statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

type CreateTaskFormProps = {
  onClose: () => void;
  onAdd: (task: Task) => void;
};


function CreateTaskForm({ onClose, onAdd }: CreateTaskFormProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [titleErr, setTitleErr] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    category: categories[0],
    status: statuses[0],
    priority: priorities[0],
    createdAt: new Date().toISOString()
  });

  useEffect(() => {
    setIsSubmitDisabled(!formData.title.trim());
  }, [formData.title]);

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (field === 'title') setTitleErr(false);
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      setTitleErr(true);
      return;
    }

    const newTask: Task = {
      ...formData,
      id: Date.now().toString()
    };

    dispatch(addTask(newTask));
    onClose();
    navigate('/'); // Редирект на главную после создания
  };

  return (
    <>
      <DialogTitle
        sx={{
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #dee2e6',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#343a40' }}>
          Создание задачи
        </Typography>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          backgroundColor: '#ffffff',
          px: 3,
          py: 2,
        }}
      >
        <Stack spacing={2} direction="column">
          <TextField
            label="Заголовок"
            required
            fullWidth
            value={formData.title}
            onChange={handleChange('title')}
            error={titleErr}
            helperText={titleErr ? "Заголовок обязателен" : ""}
            variant="outlined"
          />
          <TextField
            label="Описание"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange('description')}
            variant="outlined"
          />
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              select
              label="Категория"
              value={formData.category}
              onChange={handleChange('category')}
              sx={{ flex: 1, minWidth: '150px' }}
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
              sx={{ flex: 1, minWidth: '150px' }}
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
              sx={{ flex: 1, minWidth: '150px' }}
            >
              {priorities.map((pr) => (
                <MenuItem key={pr} value={pr}>
                  {pr}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          backgroundColor: '#f1f3f5',
          borderTop: '1px solid #dee2e6',
          px: 3,
          py: 2,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            
            
            borderRadius: 3,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#ed1313',
              border:'2px solid #ed1313'
            },
          }}
        >
          Отмена
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitDisabled}
          sx={{
            
            
            borderRadius: 3,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#10c722',
              border:'2px solid #10c722'
            },
          }}
        >
          Создать
        </Button>
      </DialogActions>
    </>
  );
}

export default CreateTaskForm;