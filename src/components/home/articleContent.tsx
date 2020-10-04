import React, { useEffect, useRef, useState } from 'react';
import '../../style/components/home/articleContent.scss';
import MyMarkdown from '../common/markdown';
import { getArticleContent } from '../../util/http';

export default function ArticleContent(props: { className?: string; aid: undefined | number }): JSX.Element {
  //文章滚动区的 ref
  const divList = useRef<HTMLDivElement>(null);
  // 文章内容
  const [articleContent, setArticleContent] = useState<string>('');
  useEffect(() => {
    if (props.aid !== undefined) {
      getArticleContent(props.aid).then((res) => {
        if (res.success) {
          setArticleContent(res.data.content);
          divList.current.scrollTop = 0;
        }
      });
    } else {
      setArticleContent('');
    }
  }, [props.aid]);
  return (
    <div ref={divList} className={props.className + ' my-article-content'}>
      <MyMarkdown value={articleContent} />
    </div>
  );
}
