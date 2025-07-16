import { Container, AppBar, Toolbar, Typography, Button, Box, Stack, Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import CreateTaskForm from './CreateTaskForm';
import { useState } from 'react';
import type { Task } from '../../entities/task/types';
// import { buttonStyles } from '../styles/buttonStyles'

type HeaderProps = {
  onAddTask: (task: Task) => void;
};

function Header({ onAddTask }: HeaderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar>
        <Container
          sx={{
            maxWidth: 'lg',
            px: { xs: 2, sm: 3, md: 5 },
            '@media (max-width: 900px)': {
              pt: 2,
              pb: 2,
            },
          }}
        >
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="#495057" strokeWidth="2" />
                <path d="M7 8H17" stroke="#495057" strokeWidth="2" strokeLinecap="round" />
                <path d="M7 12H17" stroke="#495057" strokeWidth="2" strokeLinecap="round" />
                <path d="M7 16H12" stroke="#495057" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <Typography variant="h6" component="span">
                TaskManager
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            <Stack
              sx={{
                '@media (max-width: 900px)': {
                  flexDirection: 'column',
                  mt: 2,
                  gap: 1,
                },
              }}
            >
              <Button component={Link} to="/">
                Все задачи
              </Button>
              <Button component={Link} to="/" onClick={handleOpen}>
                Создать задачу
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <CreateTaskForm onClose={handleClose} onAdd={onAddTask} />
      </Dialog>
    </>
  );
}

export default Header;
