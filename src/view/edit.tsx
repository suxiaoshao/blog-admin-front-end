import React from 'react';
import '../style/view/edit.scss';
import MyDrawer from '../components/common/myDrawer';
import MarkdownCode from '../components/edit/markdownCode';

export default function Edit(): JSX.Element {
  return (
    <MyDrawer className="edit">
      <MarkdownCode
        onChange={(newValue) => {
          console.log(newValue);
        }}
        defaultValue="111111"
      />
    </MyDrawer>
  );
}
