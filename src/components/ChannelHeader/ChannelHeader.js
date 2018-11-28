import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChannelHeader extends Component {
  render() {
    const { channelLogo, channelTitle, membersCount, isPostPage, channelLink } = this.props;
    const backLink = isPostPage ? <Link className="header__back-link" to={channelLink}><i className="fas fa-arrow-left"></i> back</Link>: <Link to="/" className="header__back-link"><i className="fas fa-bullhorn"></i></Link>;
    return (<header className="header mb-2 clearfix">
        {backLink}
        <figure className="header__channel-logo float-right" onClick={this.props.onChannelLogoClick}>
          <img src={channelLogo} alt={channelTitle}/>
        </figure>
        <div className="header__channel-info">
          <div className="text-truncate header__channel-title">{channelTitle}</div>
          <small className="text-muted">{membersCount} members</small>
        </div>

      </header>);
  }
}

export default ChannelHeader;
