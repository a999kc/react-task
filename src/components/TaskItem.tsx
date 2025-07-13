import {Box, Card, CardContent, CardHeader, Chip, Typography, Stack, Button} from '@mui/material'
import { Link } from 'react-router-dom'
import type { Task } from '../types'
import { buttonStyles } from '../styles/buttonStyles'

type Props = {
  task: Task
}

function getStatusColor(status: Task['status']) {
  switch (status) {
    case 'To Do':
      return '#AEAEB2'
    case 'In Progress':
      return '#FFCC00'
    case 'Done':
      return '#30D158'
    default:
      return '#f8f9fa'
  }
}

function getCategoryColor(status: Task['category']) {
  switch (status) {
    case 'Bug':
      return '#FF3B30'
    case 'Feature':
      return '#34C759'
    case 'Documentation':
      return '#007AFF'
    case 'Refactor':
      return '#AF52DE'
    case 'Test':
      return '#FF9500'
    default:
      return '#f8f9fa'
  }
}

function getPriorityColor(priority: Task['priority']) {
  switch (priority) {
    case 'High':
      return '#FF453A'
    case 'Medium':
      return '#e8590c'
    case 'Low':
      return '#5BD424'
    default:
      return '#f8f9fa'
  }
}

function TaskItem({ task }: Props) {
  return (
    <Card variant="outlined" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '2px solid #495057',borderRadius: 4 }}>
      <CardHeader title={task.title} sx={{ pb: 0}} />

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {task.description}
          </Typography>
        )}
        <Box sx={{ mt: 'auto', }}> 
          <Stack 
            direction="row" 
            spacing={{ xs: 0, md: 2 }}
            flexWrap="wrap" 
            justifyContent='space-between' 
            sx={{ 
              mb: 2,
              '@media (max-width: 640px)': {
                display:'flex',
                flexDirection:'row',
                alignItems:'flex-left',
                gap:'6px',
                spacing:'0',
              }
            }}>
            <Chip 
              label={task.category} 
              size="medium" 
              sx={{ 
                backgroundColor: getCategoryColor(task.category),
                color:'white',
                fontWeight:'600',
              }} 
            />
            <Chip 
              label={task.status} 
              size="medium" 
              sx={{ 
                backgroundColor: getStatusColor(task.status),
                color:'white',
                fontWeight:'600',
              }} 
            />
            <Chip 
              label={task.priority} 
              size="medium" 
              sx={{ 
                backgroundColor: getPriorityColor(task.priority),
                color: 'white',
                fontWeight:'600',
              }}  
            />
          </Stack>
          
          <Button
            component={Link}
            to={`/task/${task.id}`}
            variant="outlined"
            sx={buttonStyles.editButton}
          >
            Редактировать
          </Button>
        </Box> 
      </CardContent>
    </Card>
  )
}

export default TaskItem;


