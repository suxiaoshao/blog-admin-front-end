import React from 'react';
import MyDrawer from '../components/common/myDrawer';
import '../style/view/home.scss';
import ArticleList from '../components/home/articleList';
import ArticleContent from '../components/home/articleContent';

export default function Home(): JSX.Element {
  return (
    <MyDrawer className="home">
      <ArticleList className="article-list" />
      <ArticleContent className="article-content" />
    </MyDrawer>
  );
}
