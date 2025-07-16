import {FormControl,InputLabel,MenuItem,Select, Box, Typography} from '@mui/material';
import TaskItem from './TaskItem';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useState } from 'react';
import type { TaskStatus, TaskCategory, TaskPriority } from '../../entities/task/types';

function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');

  const filteredTasks = tasks.filter(task => {
    return (
      (statusFilter === 'all' || task.status === statusFilter) &&
      (categoryFilter === 'all' || task.category === categoryFilter) &&
      (priorityFilter === 'all' || task.priority === priorityFilter)
    );
  });

  // Получаем уникальные значения для фильтров
  const availableStatuses = [...new Set(tasks.map(task => task.status))];
  const availableCategories = [...new Set(tasks.map(task => task.category))];
  const availablePriorities = [...new Set(tasks.map(task => task.priority))];

  // const resetFilters = () => {
  //   setStatusFilter('all');
  //   setCategoryFilter('all');
  //   setPriorityFilter('all');
  // };

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
          mt: 3,
          '@media (max-width: 640px)': {
            fontSize: '24px',
          },
        }}
      >
        Все задачи
      </Typography>

      
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 3, width: '25%'}}>
        <Typography variant="subtitle1">Фильтры:</Typography>

        {/* Фильтр по статусам */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Статус</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Статус"
          >
            <MenuItem value="all">Все статусы</MenuItem>
            {availableStatuses.map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Фильтр по категориям */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Категория</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="Категория"
          >
            <MenuItem value="all">Все категории</MenuItem>
            {availableCategories.map(category => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Фильтр по приоритетам */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Приоритет</InputLabel>
          <Select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            label="Приоритет"
          >
            <MenuItem value="all">Все приоритеты</MenuItem>
            {availablePriorities.map(priority => (
              <MenuItem key={priority} value={priority}>{priority}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      

      {/* Список задач */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
          width: '100%',
          alignItems: 'stretch',
        }}
      >
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Box>
    </>
  );
}

export default TaskList;