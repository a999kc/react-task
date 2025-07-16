// import { useParams, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import type { Task, TaskStatus, TaskCategory, TaskPriority } from '../../entities/task/types';
// import { TextField, MenuItem, Button, Stack, Typography, Box, Paper } from '@mui/material';


// const categories: TaskCategory[] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
// const statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
// const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

// type TaskDetailsProps = {
//   tasks: Task[];
//   onUpdate: (updatedTask: Task) => void;
// };

// function TaskDetails({ tasks, onUpdate }: TaskDetailsProps) {

//   // const { id } = useParams();
//   // const task = useSelector((state: RootState) => 
//   //   state.tasks.find(task => task.id === id)
//   // );

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const task = tasks.find((t) => t.id === id);

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState<TaskCategory>('Feature');
//   const [status, setStatus] = useState<TaskStatus>('To Do');
//   const [priority, setPriority] = useState<TaskPriority>('Low');

//   useEffect(() => {
//     if (task) {
//       setTitle(task.title);
//       setDescription(task.description || '');
//       setCategory(task.category);
//       setStatus(task.status);
//       setPriority(task.priority);
//     }
//   }, [task]);

//   if (!task) {
//     return <Typography variant="h6">Задача не найдена</Typography>;
//   }

//   const handleSave = () => {
//     const updatedTask: Task = {
//       ...task,
//       title,
//       description,
//       category,
//       status,
//       priority,
//     };

//     onUpdate(updatedTask);
//     navigate('/');
//   };

//   return (
//     <Paper
//       sx={{
//         border: '2px solid #495057',
//         borderRadius: 4,
//         maxWidth: 600,
//         mx: 'auto',
//         mt: 4,
//         p: 4,
//       }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Редактирование задачи
//       </Typography>

//       <Stack spacing={2} direction="column">
//         <TextField
//           label="Заголовок"
//           fullWidth
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <TextField
//           label="Описание"
//           fullWidth
//           multiline
//           rows={3}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <Box display="flex" gap={2} flexWrap="wrap">
//           <TextField
//             select
//             label="Категория"
//             value={category}
//             onChange={(e) => setCategory(e.target.value as TaskCategory)}
//             sx={{ flex: 1, minWidth: 150 }}
//           >
//             {categories.map((cat) => (
//               <MenuItem key={cat} value={cat}>
//                 {cat}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             select
//             label="Статус"
//             value={status}
//             onChange={(e) => setStatus(e.target.value as TaskStatus)}
//             sx={{ flex: 1, minWidth: 150 }}
//           >
//             {statuses.map((st) => (
//               <MenuItem key={st} value={st}>
//                 {st}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             select
//             label="Приоритет"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value as TaskPriority)}
//             sx={{ flex: 1, minWidth: 150 }}
//           >
//             {priorities.map((pr) => (
//               <MenuItem key={pr} value={pr}>
//                 {pr}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Box>

//         <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
//           <Button
//             onClick={() => navigate('/')}
//             // sx={buttonStyles.declineButton}
//           >
//             Отмена
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSave}
//             // sx={buttonStyles.saveButton}
//           >
//             Сохранить
//           </Button>
//         </Box>
//       </Stack>
//     </Paper>
//   );
// }

// export default TaskDetails;



import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from '../models/taskSlice';
import type { RootState } from '../../app/store';
import { TextField, MenuItem, Button, Stack, Typography, Box, Paper } from '@mui/material';
import type { Task, TaskStatus, TaskCategory, TaskPriority } from '../../entities/task/types';

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