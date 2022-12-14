import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FC, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuList } from '../../constants';
import { useModalControll } from '../../hooks/useModalControll';
import { CreateBoardModal } from '../CreateBoardModal';
import { CreateColumnModal } from '../CreateColumnModal';
import { CreateTaskModal } from '../CreateTaskModal';
import { AddUserModal } from '../AddUserModal';

interface JusticeDrawerProps {
  children: ReactNode
}

const drawerWidth = 200;

export const JusticeDrawer: FC<JusticeDrawerProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { open: openAddBoard, handleOpen: handleOpenAddBoard, handleClose: handleCloseAddBoard } = useModalControll();
  const { open: openAddColumn, handleOpen: handleOpenAddColumn, handleClose: handleCloseAddColumn } = useModalControll();
  const { open: openAddTask, handleOpen: handleOpenAddTask, handleClose: handleCloseAddTask } = useModalControll();
  const { open: openAddUsersForBoard, handleOpen: handleOpenAddUsersForBoard, handleClose: handleCloseAddUsersForBoard } = useModalControll();

  const navigation = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const exitTaskManager = () => {
    localStorage.clear();
    navigation('/registration');
  };

  const handleActionClickButton = (link: string | null, id: number) => {
    if (link) navigation(link);

    switch (id) {
      case 2: handleOpenAddBoard();
        break;
      case 3: handleOpenAddColumn();
        break;
      case 4: handleOpenAddTask();
        break;
      case 5: handleOpenAddUsersForBoard();
        break;
      case 6: exitTaskManager();
        break;
      default:
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuList.map(({ id, description, link }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton onClick={() => handleActionClickButton(link, id)}>
              <ListItemText primary={description} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Justice Task Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, marginTop: '64px', height: '91vh' }}
      >
        {children}
        <CreateBoardModal open={openAddBoard} handleClose={handleCloseAddBoard} />
        <CreateColumnModal open={openAddColumn} handleClose={handleCloseAddColumn} />
        <CreateTaskModal open={openAddTask} handleClose={handleCloseAddTask} />
        <AddUserModal open={openAddUsersForBoard} handleClose={handleCloseAddUsersForBoard} />
      </Box>
    </Box>
  );
};
