import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Dashboard, FitnessCenter, Person} from "@mui/icons-material";
import {Link} from "react-router-dom";
import LogoutButton from "../LogoutButton";
import {ListSubheader, Stack} from "@mui/material";
import keycloak from "../../keycloak";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function SidebarDrawer() {

    const pageItems = [
        { to: '/dashboard', icon: Dashboard, text: 'Dashboard' },
        { to: '/profile', icon: Person, text: 'Profile' },
       /* { to: '/admin', icon: Person, text: 'Admin' },*/
        { to: '/setgoals', icon: Person, text: 'Set Goals'}
    ];
    const catalogItems = [
        { to: '/exercise', icon: FitnessCenter, text: 'Exercise' },
        { to: '/workout', icon: FitnessCenter, text: 'Workouts' },
    ];

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
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
                    <Stack direction="row" spacing={2} sx={{  width: "100%" }}>
                        <img
                            src={"/img/image_1.png"}
                            alt="Fit me"
                            style={{ maxWidth: "100%", height: "50px" }}
                        />
                        <h1>ME FIT</h1>
                    </Stack>
                </DrawerHeader>
                <Divider/>
                <List subheader={<ListSubheader>Pages</ListSubheader>}> {pageItems.map((item) => (
                    <ListItem component={Link} to={item.to} key={item.text}>
                        <ListItemButton>
                            <ListItemIcon>
                                <item.icon/>
                            </ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
                </List>
                {keycloak.hasRealmRole("ADMIN") && (
                    <>
                        <Divider/>
                        <List subheader={<ListSubheader>Admin</ListSubheader>}>
                            <ListItem component={Link} to={"/admin"}>   <ListItemButton>
                                <ListItemIcon>
                                    <Person/>
                                </ListItemIcon>
                                <ListItemText primary={"Admin"}/>
                            </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                )}
                <Divider/>
                <List subheader={<ListSubheader>Catalog</ListSubheader>}>
                    {catalogItems.map((item) => (
                        <ListItem component={Link} to={item.to} key={item.text}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <item.icon/>
                                </ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <br />
                <LogoutButton/>
            </Drawer>
        </Box>
    );
}