import React, { Component } from 'react';
import asyncActionsMonitor from '../../modules/asyncActionsMonitor';

export default class Spinner extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    asyncActionsMonitor.promise.then( () => {
      this.setState( { loading: false } );
    } );
  }

  render() {
    return (this.state.loading ? 'Loading...':'Loaded!');
  }
}
