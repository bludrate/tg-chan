import React, { Component } from 'react';
import classNames from 'classnames';

class ChannelInfo extends Component {
  render() {
    const rootClassNames = classNames('channel-info', {'channel-info_active': this.props.active});

    const {channel, onBackClick} = this.props;
    const link = 'https://t.me/' + channel.username;
    const info = {
      __html: channel.info && channel.info.replace(/<a/g, '<a rel="noopener noreferrer nofollow"')
    };

    return (<div className={rootClassNames}>
        <header className="channel-info__header">
          <button className="header__back-link" onClick={onBackClick}><i className="fas fa-arrow-left"></i> back</button>
        </header>
        <section className="channel-info__content">
          <div className="channel-info__general">
            <figure className="channel-info__logo">
              <img src={channel.avatar} alt={channel.title + ' logo'}/>
            </figure>
            <div className="channel-info__main">
              <h2 className="channel-info__title">{channel.title}</h2>
              <div className="channel-info__members">{channel.members} members</div>
            </div>
          </div>
          <div className="channel-info__block">
            <h3 className="channel-info__block-title">info</h3>
            <div className="channel-info__description" dangerouslySetInnerHTML={info}></div>
          </div>
          <div className="channel-info__block">
            <h3 className="channel-info__block-title">share link</h3>
            <div className="channel-info__description"><a href={link} className="text-white" rel="noopener noreferrer nofollow">{link}</a></div>
          </div>

        </section>
      </div>);
  }
}

export default ChannelInfo;
