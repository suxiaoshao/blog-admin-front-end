import React, { useContext, useMemo, useState } from 'react';
import '../../style/components/edit/editForm.scss';
import { Chip, Fade, IconButton, InputLabel, Menu, MenuItem, TextField } from '@material-ui/core';
import { ThemeContext } from '../common/theme';
import { Add, Send } from '@material-ui/icons';

interface EditFormProp {
  title: string;
  onTitleChange: (value: string) => void;
  typeList: number[];
  onTypeListChange: (value: number[]) => void;
  onClickSend: () => void;
  content: string;
}

export default function EditForm(prop: EditFormProp): JSX.Element {
  // 总类型
  const { typeList } = useContext(ThemeContext);
  // 未被选中
  const notTypeList = useMemo<number[]>(
    () =>
      typeList
        .map((value, index) => {
          return index;
        })
        .filter((value) => {
          return !prop.typeList.some((value1) => {
            return value1 === value;
          });
        }),
    [typeList, prop.typeList],
  );
  // 锚点
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  return (
    <div className="edit-form">
      <TextField
        label="标题"
        className="title-input"
        value={prop.title}
        onChange={(event) => {
          prop.onTitleChange(event.target.value);
        }}
      />
      <div className="type-input">
        <InputLabel>标签选择</InputLabel>
        <div className="type-form">
          {prop.typeList.map<React.ReactNode>((value) => (
            <Chip
              key={value}
              label={typeList[value]}
              onDelete={() => {
                const newList = [...prop.typeList].filter((value1) => {
                  return value1 !== value;
                });
                prop.onTypeListChange(newList);
              }}
            />
          ))}
          <IconButton
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
            disabled={typeList.length === prop.typeList.length}
          >
            <Add />
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            keepMounted
            onClose={() => {
              setAnchorEl(null);
            }}
            TransitionComponent={Fade}
          >
            {notTypeList.map<React.ReactNode>((value) => {
              return (
                <MenuItem
                  key={value}
                  onClick={() => {
                    const newList = [...prop.typeList];
                    newList.push(value);
                    prop.onTypeListChange(newList);
                    setAnchorEl(null);
                  }}
                >
                  {typeList[value]}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      </div>
      <IconButton
        disabled={prop.title === '' || prop.content === ''}
        className="send-button"
        onClick={() => {
          prop.onClickSend();
        }}
      >
        <Send />
      </IconButton>
    </div>
  );
}
