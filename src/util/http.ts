import axios from 'axios';
import { baseUrl } from './config';

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

//获取类型数组
export async function getTypeList(): Promise<WebInterface<TypeList>> {
  const res = await axios.get<WebInterface<TypeList>>('/typeList');
  return res.data;
}
