import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Link } from 'react-router-dom';
import kFormatter from '../../modules/kFormatter';

class ChannelList extends Component {
  componentWillMount() {
    this.props.dispatch( actions.channels.fetch() );
  }
  render() {
    const list = this.props.list || [];
    const channels = list.map( c => {
      const channelLink = `/channel/${c.username}/`;
      const info = {
        __html: c.info
      };

      return ( <li key={c._id} className="channel-list__item clearfix">
        <div className="channel-list__item-left">
          <figure className="channel-list__item-img">
            <Link to={channelLink}><img src={c.avatar} alt={c.title + 'image'} width="55" height="55" className="rounded"/></Link>
          </figure>
          <div className="text-center channel-list__item-members">
            <span className="fas fa-users channel-list__item-members-ico"></span>
            {kFormatter( c.members )}
          </div>
        </div>

        <div className="channel-list__item-right">
          <Link to={channelLink} className="channel-list__item-link fas fa-arrow-right"></Link>
        </div>
        <div className="mb-1 font-weight-bold channel-list__item-title text-truncate">{c.title}</div>
        <div className="channel-list__item-description" dangerouslySetInnerHTML={info}></div>
        </li> );
    } );

    return (<div><ul className="channel-list list-unstyled">
      { channels }
    </ul></div>);
  }
}

function select( state ) {
  return {
    list: state.channels
  };
}

export default connect(select)(ChannelList);
