import React, { Component } from 'react';
import MainSearch from '../MainSearch';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import actions from '../../actions';

class MainHeader extends Component {
  onChangeSearchQuery = ( query ) => {
    this.props.dispatch( actions.search.changeQuery( query ) );
  }

  render() {
    const { searchQuery } = this.props;
    return (
      <header className='header clearfix p-2'>
        <div className="float-left mr-3"><span className="logo"><Link to="/"><img src="./img/logo.png" alt="Logo" width="40" height="40" /></Link></span></div>
        <div className="float-left pt-1"><MainSearch query={searchQuery} onChangeQuery={this.onChangeSearchQuery}/></div>
      </header>
    );
  }
}

function select( state ) {
  return {
    searchQuery: state.search.query
  };
}

export default connect(select)(MainHeader);
