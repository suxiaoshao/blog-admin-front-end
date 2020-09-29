import React, { useCallback, useEffect, useRef, useState } from 'react';
import ArticleForm from './articleForm';
import { ArticleInfoItem, getArticleList, getArticleNum } from '../../util/http';
import { articleLimit } from '../../util/config';
import ArticleItem from './articleItem';
import { Button, List, Typography } from '@material-ui/core';
import '../../style/components/articleList.scss';

interface ArticleListProp {
  className?: string;
  activeAid: number | undefined;
  onChangeActive: (aid: number | undefined) => void;
}

export default function ArticleList(props: ArticleListProp): JSX.Element {
  //文章总数
  const [articleNum, setArticleNum] = useState<number>(0);
  //文章信息列表
  const [articleList, setArticleList] = useState<ArticleInfoItem[]>([]);
  //页面宽度的引用
  const listDiv = useRef<HTMLDivElement>(null);
  //储存滚动长度
  const [oldHeight, setOldHeight] = useState<number>(0);
  //展示的搜索
  const [searchName, setSearchName] = useState<string>('');
  // sort
  const [sort, setSort] = useState<1 | -1>(-1);
  // 匹配
  const [allType, setAllType] = useState<boolean>(false);
  // 选择的类型
  const [typeList, setTypeList] = useState<number[]>([]);
  // 获取数据
  const getDataList = useCallback(
    async (offset: number) => {
      setOldHeight(listDiv.current.scrollTop);
      const articleNumData = await getArticleNum(searchName, typeList, allType);
      if (!articleNumData.success) {
        return;
      } else if (articleNumData.data.count < offset) {
        return;
      }
      setArticleNum(articleNumData.data.count);
      const articleListData = await getArticleList(offset, articleLimit, sort, searchName, typeList, allType);
      if (!articleListData.success) {
        // return;
      }
      setArticleList((oldList) => {
        return oldList.concat(articleListData.data.articleList);
      });
    },
    [allType, searchName, sort, typeList],
  );

  //改变offset值
  useEffect(() => {
    setArticleList([]);
    getDataList(0).then();
  }, [getDataList]);

  //改变长度
  useEffect(() => {
    listDiv.current.scrollTop = oldHeight;
  }, [articleList]);

  useEffect(() => {
    console.log(searchName, sort, allType, typeList);
  }, [allType, searchName, sort, typeList]);
  return (
    <div className={(props.className ? props.className + ' ' : '') + 'my-article-list'} ref={listDiv}>
      <ArticleForm
        className="form"
        onSubmit={(searchNames, sorts, allTypes, typeLists) => {
          setSearchName(searchNames);
          setTypeList(typeLists);
          setAllType(allTypes);
          setSort(sorts);
        }}
      />
      <List className="list">
        {articleList.map<React.ReactNode>((value) => (
          <ArticleItem
            onSelected={() => {
              props.onChangeActive(value.aid);
            }}
            onUnselected={() => {
              props.onChangeActive(undefined);
            }}
            active={props.activeAid === value.aid}
            {...value}
            key={value.aid}
          />
        ))}
      </List>
      <Button
        className="load-button"
        onClick={() => {
          getDataList(articleList.length).then();
        }}
        disabled={articleNum <= articleList.length}
      >
        <Typography variant="h6">{articleNum <= articleList.length ? '已经到底了' : '加载'}</Typography>
      </Button>
    </div>
  );
}
