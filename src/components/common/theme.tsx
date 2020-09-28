import React, { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { getTypeList } from '../../util/http';

export interface ThemeContextProp {
  isDark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
  typeList: string[];
}

export const ThemeContext = createContext<ThemeContextProp>({
  isDark: true,
  setDark: () => {
    console.log(111);
  },
  typeList: [],
});

export default function MyTheme(props: { children: React.ReactNode }): JSX.Element {
  //是否黑色
  const [isDark, setDark] = useState<boolean>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  //主题对象
  const themeObject = useMemo<Theme>(() => {
    return createMuiTheme({
      palette: {
        type: isDark ? 'dark' : 'light',
      },
    });
  }, [isDark]);
  //类型数组
  const [typeList, setTypeList] = useState<string[]>([]);
  //获取图片数组
  useEffect(() => {
    getTypeList().then((data) => {
      setTypeList(data.data.typeList);
    });
  }, []);
  return (
    <MuiThemeProvider theme={themeObject}>
      <CssBaseline />
      <ThemeContext.Provider
        value={{
          isDark: isDark,
          setDark: setDark,
          typeList: typeList,
        }}
      >
        <div className={isDark ? 'my-dark' : 'my-light'}>{props.children}</div>
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}
