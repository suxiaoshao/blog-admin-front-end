import React, { useContext } from 'react';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Brightness4, Brightness5, Edit, Home, VpnKey } from '@material-ui/icons';
import '../../style/components/common/myDrawer.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { ThemeContext } from './theme';

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

const drawerList: DrawerListItemProp[] = [
  { text: '文章列表', pathname: '/', icon: <Home /> },
  {
    text: '新博客',
    pathname: '/edit/0',
    icon: <Edit />,
  },
  {
    text: '登陆',
    pathname: '/login',
    icon: <VpnKey />,
  },
];
export default function MyDrawer(props: { children?: React.ReactNode; className?: string }): JSX.Element {
  const { isDark, setDark } = useContext(ThemeContext);
  return (
    <div className="my-drawer">
      <Drawer variant="permanent" anchor="left" className="drawer">
        <List className="drawer-list main">
          {drawerList.map<JSX.Element>((value) => (
            <DrawerListItem key={value.pathname} {...value} />
          ))}
        </List>
        <Divider />
        <List className="drawer-list">
          <ListItem
            button
            onClick={() => {
              setDark((value) => !value);
            }}
          >
            <ListItemIcon>{isDark ? <Brightness5 /> : <Brightness4 />}</ListItemIcon>
            <ListItemText>{isDark ? '切换为亮色' : '切换为暗色'}</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={props.className}>{props.children}</main>
    </div>
  );
}
