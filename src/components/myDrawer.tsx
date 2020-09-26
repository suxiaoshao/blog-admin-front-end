import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import '../style/components/myDrawer.scss';
import { useHistory, useLocation } from 'react-router-dom';

interface DrawerListItemProp {
  pathname: string;
  text: string;
  icon: React.ReactNode;
}

function DrawerListItem(props: DrawerListItemProp): JSX.Element {
  const myLocation = useLocation();
  const myHistory = useHistory();
  return (
    <ListItem
      button
      selected={myLocation.pathname === props.pathname}
      onClick={() => {
        myHistory.push(props.pathname);
      }}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText>{props.text}</ListItemText>
    </ListItem>
  );
}
const drawerList: DrawerListItemProp[] = [{ text: '文章列表', pathname: '/', icon: <Home /> }];
export default function MyDrawer(props: { children?: React.ReactNode }): JSX.Element {
  return (
    <div className="my-drawer">
      <Drawer variant="permanent" anchor="left" className="drawer">
        <List>
          {drawerList.map<JSX.Element>((value) => (
            <DrawerListItem key={value.pathname} {...value} />
          ))}
        </List>
      </Drawer>
      <main>{props.children}</main>
    </div>
  );
}
