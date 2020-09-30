import React, { useState } from 'react';
import '../style/view/edit.scss';
import MyDrawer from '../components/common/myDrawer';
import MarkdownCode from '../components/edit/markdownCode';
import MyMarkdown from '../components/common/markdown';
import EditForm from '../components/edit/editForm';

export default function Edit(): JSX.Element {
  const [content, setContent] = useState<string>('');
  // 标题
  const [title, setTitle] = useState<string>('');
  // 被选中
  const [typeList, setTypeList] = useState<number[]>([]);
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
          console.log(title, typeList, content);
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
