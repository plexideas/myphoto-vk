import React, { Component } from 'react';
import PageContainer from '../containers/PageContainer';
import  UserContainer from '../containers/UserContainer';

class App extends Component {
  render() {
    return (
      <div className="row">
        <PageContainer />
        <UserContainer />
      </div>
    );
  }
}

export default App;
