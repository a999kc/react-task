import { AppBar, Toolbar, Typography, Button, Box, Stack, Dialog } from "@mui/material";
import { Link } from 'react-router-dom';
import CreateTaskForm from "./CreateTaskForm";
import { useState } from 'react';
import type { Task } from '../types';
import { buttonStyles } from '../styles/buttonStyles'


type HeaderProps = {
  onAddTask: (task: Task) => void;
};

function Header({ onAddTask }: HeaderProps) {

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
        <AppBar 
            position="static" 
            elevation={0}
            sx={{ 
                boxShadow: 'none',
                background: '#f8f9fa',
                borderBottom: '2px solid #495057',
                mb: 3, 
                px: 0,
                '& .MuiToolbar-root': {
                    px: 0
                },
                '@media (max-width: 1280px)': {
                    px:20,
                },
                '@media (max-width: 900px)': {
                    px:10,
                },
                '@media (max-width: 440px)': {
                    px:5,
                },
            }}
        >
            <Toolbar
                sx={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                    py: 1,
                    '@media (max-width: 900px)': {
                        flexDirection:'column'
                    }
            }}
            >
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
                    <Typography 
                        variant="h6" 
                        component="span" 
                        sx={{ 
                            color: '#495057',
                            fontWeight: 600,
                            letterSpacing: 0.5,

                        
                    }}
                    >
                        TaskManager
                    </Typography>
                </Box>
                <Stack 
                    direction="row" 
                    spacing={{ xs: 0, md: 2 }}
                    sx = {{
                        '@media (max-width: 900px)': {
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center',
                            gap: 2,
                            
                        }
                }}
                >
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    sx={buttonStyles.allItemsButton}
                >
                    Все задачи
                </Button>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    onClick={handleOpen}
                    sx={buttonStyles.createItemButton}
                >
                    Создать задачу
                </Button>
                </Stack>
            </Toolbar>
        </AppBar>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <CreateTaskForm onClose={handleClose} onAdd={onAddTask}/>
        </Dialog>
    </>
  );
}

export default Header;