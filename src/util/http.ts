import axios from 'axios';
import { baseUrl } from './config';
import qs from 'qs';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;

//web数据基本形式
export interface WebInterface<T = never> {
  success: boolean;
  msg: string;
  data: T;
}

//文章类型数组
export interface TypeList {
  typeList: string[];
}

//文章数量
export interface ArticleNumData {
  count: number;
}

//文章列表信息
export interface ArticleInfoItem {
  title: string;
  aid: number;
  type: number[];
  replyNum: number;
  readNum: number;
  timeStamp: number;
}

//文章列表数据
export interface ArticleListData {
  articleList: ArticleInfoItem[];
}

//获取类型数组
export async function getTypeList(): Promise<WebInterface<TypeList>> {
  const res = await axios.get<WebInterface<TypeList>>('/typeList');
  return res.data;
}

//获取文章数量
export async function getArticleNum(
  searchName: string,
  type: number[],
  allType: boolean,
): Promise<WebInterface<ArticleNumData>> {
  const response = await axios.get<WebInterface<ArticleNumData>>(
    '/articleNum?' +
      qs.stringify(
        {
          searchName: searchName,
          type: type,
          allType: allType,
        },
        { indices: false },
      ),
  );
  return response.data;
}

//获取文章列表
export async function getArticleList(
  offset: number,
  limit: number,
  sort: number,
  searchName: string,
  type: number[],
  allType: boolean,
): Promise<WebInterface<ArticleListData>> {
  const response = await axios.get<WebInterface<ArticleListData>>(
    '/articleList?' +
      qs.stringify(
        {
          offset: offset,
          limit: limit,
          searchName: searchName,
          type: type,
          sort: sort,
          allType: allType,
        },
        { indices: false },
      ),
  );
  return response.data;
}
