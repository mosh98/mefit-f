import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Dashboard, FitnessCenter, Home, Person} from "@mui/icons-material";
import {Link} from "react-router-dom";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function SidebarDrawer() {

    const items = [
        { to: '/', icon: Home, text: 'Start' },
        { to: '/dashboard', icon: Dashboard, text: 'Dashboard' },
        { to: '/profile', icon: Person, text: 'Profile' },
        { to: '/workout', icon: FitnessCenter, text: 'Workouts' },
        { to: '/exercise', icon: FitnessCenter, text: 'Exercise' },
        { to: '/admin', icon: Person, text: 'Admin' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <DrawerHeader>
                </DrawerHeader>
                <List>
                    {items.map((item) => (
                        <ListItem component={Link} to={item.to} key={item.text} >
                            <ListItemButton>
                                <ListItemIcon>
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />

            </Drawer>
        </Box>
    );
}