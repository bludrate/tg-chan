import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (<div>
        Страница не найдена. 404
        <Link to="/">Главная страница</Link>
      </div>);
  }
}

export default NotFound;
