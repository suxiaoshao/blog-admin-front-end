import React, { useContext, useEffect } from 'react';
import {
  Button,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { ArticleInfoItem } from '../../util/http';
import { AccessAlarm, ChatBubble, ExpandLess, ExpandMore, Style, Visibility } from '@material-ui/icons';
import '../../style/components/home/articleItem.scss';
import { ThemeContext } from '../common/theme';
import { getFormatTime } from '../../util/time';
import { useHistory } from 'react-router-dom';

interface ArticleItemProp extends ArticleInfoItem {
  active: boolean;
  onSelected: () => void;
  onUnselected: () => void;
}

type InfoListProp = Omit<ArticleInfoItem, 'title'>;

function InfoList(props: InfoListProp): JSX.Element {
  const { typeList } = useContext(ThemeContext);
  const myHistory = useHistory();
  return (
    <>
      <List>
        <ListItem>
          <ListItemIcon>
            <AccessAlarm />
          </ListItemIcon>
          <ListItemText>{getFormatTime(props.timeStamp)}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Visibility />
          </ListItemIcon>
          <ListItemText>{props.readNum}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ChatBubble />
          </ListItemIcon>
          <ListItemText>{props.replyNum}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Style />
          </ListItemIcon>
          <ListItemText>
            {props.type.map<JSX.Element>((value) => {
              return <Chip key={value} label={typeList[value]} />;
            })}
          </ListItemText>
        </ListItem>
      </List>
      <Button
        size="large"
        className={'button-width'}
        onClick={() => {
          myHistory.push(`/edit/${props.aid}`);
        }}
      >
        修改
      </Button>
    </>
  );
}

export default function ArticleItem(props: ArticleItemProp): JSX.Element {
  useEffect(() => {
    if (props.active) {
      setTimeout(() => {
        document.getElementsByClassName('active-list-item').item(0).scrollIntoView({ behavior: 'smooth' });
      }, 230);
    }
  }, [props.active]);
  return (
    <>
      <ListItem selected={props.active} className={'list-item' + (props.active ? ' active-list-item' : undefined)}>
        <ListItemText className={props.active ? 'active-text' : 'un-active-text'}>{props.title}</ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => {
              props.active ? props.onUnselected() : props.onSelected();
            }}
          >
            {props.active ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse className={props.active ? 'active-info' : undefined} in={props.active} timeout="auto" unmountOnExit>
        <InfoList
          aid={props.aid}
          type={props.type}
          replyNum={props.replyNum}
          readNum={props.readNum}
          timeStamp={props.timeStamp}
        />
      </Collapse>
    </>
  );
}
