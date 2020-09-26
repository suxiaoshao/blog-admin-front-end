import React from 'react';

export default class App extends React.Component<{}, {}> {
  render() {
    console.log(111);
    return (
      <h1
        className={'my-h'}
        onClick={() => {
          console.log(222);
        }}
      >
        11111
      </h1>
    );
  }
}
