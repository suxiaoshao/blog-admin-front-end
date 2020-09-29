import React, { useState } from 'react';
import MyDrawer from '../components/common/myDrawer';
import '../style/view/home.scss';
import ArticleList from '../components/home/articleList';
import ArticleContent from '../components/home/articleContent';

export default function Home(): JSX.Element {
  const [activeAid, setActiveAid] = useState<number | undefined>(undefined);
  return (
    <MyDrawer className="home">
      <ArticleList
        onChangeActive={(aid) => {
          setActiveAid(aid);
        }}
        activeAid={activeAid}
        className="article-list"
      />
      <ArticleContent aid={activeAid} className="article-content" />
    </MyDrawer>
  );
}
