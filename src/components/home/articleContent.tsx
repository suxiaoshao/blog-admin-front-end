import React from 'react';
import '../../style/components/articleContent.scss';

export default function ArticleContent(props: { className?: string }): JSX.Element {
  return <div className={props.className + ' my-article-content'} />;
}
