import React, { Component } from 'react';

class MainSearch extends Component {
  onChangeQuery = ( event ) => {
    this.props.onChangeQuery( event.target.value );
  }

  render() {
    const { query } = this.props;
    return (
      <form className="search">
        <input type="text" className="search__input" value={ query } placeholder="Search..." onChange={this.onChangeQuery}/>
      </form>
    );
  }
}

export default MainSearch;
