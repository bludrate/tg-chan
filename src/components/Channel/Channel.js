import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChannelHeader from '../ChannelHeader';
import ChannelInfo from '../ChannelInfo';
import PostList from '../PostList';
import actions from '../../actions';
import PageTitle from '../PageTitle';
import {Link} from 'react-router-dom';

function mapStateToProps( state, props ) {
  const channel = state.channel.data;//state.channels.find( c => c.username === props.match.params.username ) || {};
  const showChannelInfo = state.channel.showChannelInfo;
  const postIndex = props.match.params.postIndex;
  const isPostPage = !!postIndex;

  if ( !channel ) {
    return {
      loaded: true,
      error: {
        code: 404
      }
    };
  }

  if ( props.match.params.username !== channel.username ) {
    return {
      channel: {
        posts: []
      },
      loaded: false,
      isPostPage,
    }
  }

  if ( channel.posts && props.match.params.postIndex ) {
    const currentPost = channel.posts.find(p => p.postIndex === Number( postIndex ) );
    channel.posts = [];

    if ( currentPost ) {
      channel.posts.push( currentPost );
    }
  }

  return {
    channel,
    showChannelInfo,
    loaded: postIndex ? (channel.posts && channel.posts.length):( channel.posts && channel.posts.length > 1 ),
    isPostPage,
  };
}

class Channel extends Component {
  onChannelLogoClick = () => {
    this.props.dispatch(actions.channel.onLogoClick());
  }

  onBackClick = () => {
    this.props.dispatch(actions.channel.onBackClick());
  }

  load() {
    this.props.dispatch( actions.channel.fetch( this.props.match.params.username, this.props.match.params.postIndex ) );
  }

  componentWillMount() {
    if ( !this.props.loaded ) {
      this.load();
    }
  }

  componentWillReceiveProps( nextProps ) {
    if ( !nextProps.loaded ) {
      this.load();
    }
  }

  render() {
    if ( this.props.error && this.props.error.code === 404 ) {
      return (<div><h2>Страница не найдена (</h2><Link to="/">Главная страница</Link></div>);
    }
    const { channel, showChannelInfo, isPostPage } = this.props;
    const posts = channel.posts || [];
    const pageTitle = isPostPage ? (posts && posts.length && posts[0].content.text && channel.posts[0].content.text.text) || channel.title : channel.title;


    return (<div className="channel-page">
        <PageTitle title={pageTitle}/>
        <ChannelInfo channel={channel} active={showChannelInfo} onBackClick={this.onBackClick}/>
        <ChannelHeader isPostPage={isPostPage} channelLink={`/channel/${channel.username}/`} channelLogo={channel.avatar} channelTitle={channel.title} membersCount={channel.members} onChannelLogoClick={this.onChannelLogoClick}/>
        <main className="channel-page__main">
          <PostList posts={posts}/>
        </main>
      </div>);
  }
}

export default connect(mapStateToProps)(Channel);
