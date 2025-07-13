import { DialogTitle, DialogContent, DialogActions, TextField,
    MenuItem, Button, Stack, Typography, Box} from '@mui/material';
import { useState, useEffect } from 'react';
import type { Task, TaskStatus, TaskCategory, TaskPriority } from '../types';


const categories: TaskCategory[] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
const statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];


type CreateTaskFormProps = {
  onClose: () => void;
  onAdd: (task: Task) => void;
};



function CreateTaskForm({ onClose, onAdd }: CreateTaskFormProps) {
  const [titleErr, setTitleErr] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<TaskCategory>(categories[0]);
  const [status, setStatus] = useState<TaskStatus>(statuses[0]);
  const [priority, setPriority] = useState<TaskPriority>(priorities[0])


  useEffect(() => {
    setIsSubmitDisabled(!title.trim());
  }, [title]);

  const handleSubmit = () => {

    if (!title.trim()) {
      setTitleErr(true);
      return; 
    }

    let newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        category,
        status,
        priority,
    };
    
    onAdd(newTask);
    onClose();

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
        <Stack spacing={2}>
          <TextField
            label="Заголовок"
            required
            fullWidth
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setTitleErr(false);
            }}
            variant="outlined"
          />
          <TextField
            label="Описание"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            variant="outlined"
          />
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              select
              label="Категория"
              value={category}
              onChange={e => setCategory(e.target.value as TaskCategory)}
              sx={{ flex: 1, minWidth: '150px' }}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Статус"
              value={status}
              onChange={e => setStatus(e.target.value as TaskStatus)}
              sx={{ flex: 1, minWidth: '150px' }}
            >
              {statuses.map(st => (
                <MenuItem key={st} value={st}>{st}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Приоритет"
              value={priority}
              onChange={e => setPriority(e.target.value as TaskPriority)}
              sx={{ flex: 1, minWidth: '150px' }}
            >
              {priorities.map(pr => (
                <MenuItem key={pr} value={pr}>{pr}</MenuItem>
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
                backgroundColor: '#4263eb',
                color: 'white',
                borderRadius: 3,
                fontWeight: 600,
                '&:hover': {
                backgroundColor: '#ed1313',
            },
        }}>
            Отмена
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitDisabled}
          sx={{
            backgroundColor: isSubmitDisabled ? '#adb5bd' : '#4263eb',
            color: 'white',
            borderRadius: 3,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: isSubmitDisabled ? '#adb5bd' : '#10c722',
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
