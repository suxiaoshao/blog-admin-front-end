import React from 'react';
import ArticleForm from './articleForm';

export default function ArticleList(props: { className?: string }): JSX.Element {
  return (
    <div className={props.className}>
      <ArticleForm
        onSubmit={(searchName, sort, allType, typeList) => {
          console.log(searchName, sort, allType, typeList);
        }}
      />
    </div>
  );
}
