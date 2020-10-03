import React, { useEffect, useState } from 'react';
import '../style/view/edit.scss';
import MyDrawer from '../components/common/myDrawer';
import MarkdownCode from '../components/edit/markdownCode';
import MyMarkdown from '../components/common/markdown';
import EditForm from '../components/edit/editForm';
import { useLocation } from 'react-router-dom';
import { getArticleContent, postUpdateArticle } from '../util/http';

export default function Edit(): JSX.Element {
  const [content, setContent] = useState<string>('');
  // 标题
  const [title, setTitle] = useState<string>('');
  // 被选中
  const [typeList, setTypeList] = useState<number[]>([]);
  // 文章id
  const [aid, setAid] = useState<number>(0);
  // 路由信息
  const myLocation = useLocation();
  useEffect(() => {
    const routerAid = myLocation.pathname.match(/edit\/(?<aid>.*)/)?.groups?.['aid'];
    if (routerAid !== '0' && routerAid !== undefined) {
      setAid(Number(routerAid));
    } else {
      setAid(0);
    }
  }, [myLocation]);
  // 更新
  useEffect(() => {
    if (aid !== 0) {
      getArticleContent(Number(aid)).then((res) => {
        if (res.success) {
          setContent(res.data.content);
          setTitle(res.data.title);
          setTypeList(res.data.type);
        }
      });
    }
  }, [aid]);
  return (
    <MyDrawer className="edit">
      <EditForm
        title={title}
        onTitleChange={(value) => {
          setTitle(value);
        }}
        typeList={typeList}
        onTypeListChange={(value) => {
          setTypeList(value);
        }}
        onClickSend={() => {
          postUpdateArticle(aid, title, content, typeList).then((res) => {
            if (!res.success) {
            }
          });
        }}
      />
      <div className="edit-area">
        <MarkdownCode
          onChange={(newValue) => {
            setContent(newValue);
          }}
          defaultValue={content}
        />
        <MyMarkdown value={content} className="markdown-preview" />
      </div>
    </MyDrawer>
  );
}
