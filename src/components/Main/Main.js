import React, { Component } from 'react';
import ChannelList from '../ChannelList';
//import MainHeader from '../MainHeader';
import PageTitle from '../PageTitle';

//import actions from '../../actions';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <PageTitle title="Tg chan"/>
        <ChannelList/>
      </div>
    );
  }
}

export default Main;
