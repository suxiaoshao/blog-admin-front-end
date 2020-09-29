import React, { useContext, useMemo, useState } from 'react';
import {
  Button,
  Chip,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import '../../style/components/articleForm.scss';
import { ThemeContext } from '../common/theme';
import { Add } from '@material-ui/icons';

//表单
export default function ScreenForm(props: {
  onSubmit?: (searchName: string, sort: 1 | -1, allType: boolean, typeList: number[]) => void;
  className?: string;
}): JSX.Element {
  //展示的搜索
  const [searchName, setSearchName] = useState<string>('');
  // sort
  const [sort, setSort] = useState<1 | -1>(-1);
  // 匹配
  const [allType, setAllType] = useState<boolean>(false);
  // 选择的类型
  const [typeList, setTypeList] = useState<number[]>([]);
  //总 type 列表
  const { typeList: allTypeList } = useContext(ThemeContext);
  //未被选择的 type
  const notChooseType = useMemo<number[]>(() => {
    return allTypeList
      .map((value, index) => {
        return index;
      })
      .filter((value) => {
        return !typeList.some((value1) => {
          return value1 === value;
        });
      });
  }, [allTypeList, typeList]);
  // 锚点
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <div className={'article-form' + (props.className ? ' ' + props.className : '')}>
      {/*搜索输入框*/}
      <TextField
        label="搜索内容"
        className="search-input"
        value={searchName}
        onChange={(event) => {
          setSearchName(event.target.value);
        }}
      />

      {/* 选择器 */}
      <div className="selected-form">
        <FormControl className="selected-item">
          <InputLabel>文章排序</InputLabel>
          <Select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as 1 | -1);
            }}
          >
            <MenuItem value={-1}>最新文章</MenuItem>
            <MenuItem value={1}>最早文章</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="selected-item">
          <InputLabel>文章排序</InputLabel>
          <Select
            value={allType ? 1 : 0}
            onChange={(event) => {
              setAllType(Boolean(event.target.value));
            }}
          >
            <MenuItem value={1}>全匹配</MenuItem>
            <MenuItem value={0}>非全匹配</MenuItem>
          </Select>
        </FormControl>
      </div>
      <InputLabel
        style={{
          marginTop: 7,
        }}
      >
        标签选择
      </InputLabel>
      <div className="type-form">
        {typeList.map<React.ReactNode>((value) => (
          <Chip
            key={value}
            label={allTypeList[value]}
            onDelete={() => {
              const newList = [...typeList].filter((value1) => {
                return value1 !== value;
              });
              setTypeList(newList);
            }}
          />
        ))}
        <IconButton
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
          disabled={typeList.length === allTypeList.length}
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
          {notChooseType.map<React.ReactNode>((value) => {
            return (
              <MenuItem
                key={value}
                onClick={() => {
                  const newList = [...typeList];
                  newList.push(value);
                  setTypeList(newList);
                  setAnchorEl(null);
                }}
              >
                {allTypeList[value]}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
      <Button
        size="large"
        variant="contained"
        color="primary"
        className="button-width"
        onClick={() => {
          props?.onSubmit(searchName, sort, allType, typeList);
        }}
      >
        确定
      </Button>
    </div>
  );
}
