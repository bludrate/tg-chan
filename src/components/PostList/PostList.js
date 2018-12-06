import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getPostData from '../../modules/processPostData';
import getLocationData from '../../modules/locationData';
import formatSeconds from '../../modules/formatSeconds';
import bytesToSize from '../../modules/bytesToSize';

class PostList extends Component {
  componentDidUpdate() {
    this.postListElem.scrollTop = 999999;
  }

  componentDidMount() {
    if ( this.postListElem.scrollTop === 0 && this.props.posts.length ) {
      this.postListElem.scrollTop = 999999;
    }
  }

  render() {
    const {isPostPage} = this.props;
    const posts = this.props.posts.map( p => {
      const post = getPostData( p );

      let content;
      let isVideoNote;

      let itemClass = 'post-list__item post-list__item_' + post.contentType;

      if ( post.deleted ) {
        itemClass += ' post-list__item_deleted';
      }


      switch( post.contentType ) {
        case 'contact':
          content = (<div className="post-list__item-content">
            Имя: {p.content.contactName}<br/>
            Телефон: <a target="_blank" rel="noopener noreferrer nofollow" href={ 'tel:' + p.content.contactPhone }>{p.content.contactPhone }</a><br/>
            Аватарка: <img width="80" height="80" src={p.content.contactAvatarUrl} alt={ p.content.contactName + ' avatar'}/>
          </div>);
          break;
        case 'document':
          content = (<div className="post-list__item-content">
            Документ: {p.content.document.fileName }<br/>
            Тип: {p.content.document.mimeType }<br/>
            Размер: {bytesToSize(p.content.document.size, 2)}
          </div>);
          break;
        case 'sticker':
          content = (<div className="post-list__item-content">
            <img width="256" src={post.content.stickerUrl} alt={post.content.text}/>
          </div>);
          break;
        case 'audio':
          content = (<div className="post-list__item-content">
            <div>Аудио: {post.content.audio.title}<br/>Исполнитель: {post.content.audio.performer}<br/>Продолжительность: {formatSeconds(post.content.audio.duration)}</div>
          </div>);
          break;
        case 'location':
          const locationData = getLocationData({
            location: post.content.location
          });

          content = (<a href={locationData.link} target="_blank" rel="noopener noreferrer nofollow" className="post-list__item-content">
              <img src={locationData.img} alt="location" width="600" height="400"/>
          </a>);
          break;
        case 'voicenote':
          content = (<div className="post-list__item-content">
            <audio src={p.content.voiceUrl} controls></audio>
          </div>);
          break;
        case 'videonote':
          isVideoNote = true;
          // eslint-disable-next-line
        case 'video':
          const videoStyle = {
            paddingTop: (post.content.aspectRatio * 100) + '%'
          };
          let videoCaption;

          if ( post.text ) {
            videoCaption = <span className="post-list__img-text">{post.text}</span>;
          }

          content = (<div className="post-list__item-content" style={videoStyle}>
            <video width="100%" height="auto" poster={p.content.videoThumb} muted={isVideoNote} autoPlay={isPostPage} preload="metadata" src={p.content.videoUrl} controls alt={post.text}/>
            {videoCaption}
          </div>);
          break;
        case 'animation':
          const animationStyle = {
            paddingTop: (post.content.aspectRatio * 100) + '%'
          };
          let animationCaption;

          if ( post.text ) {
            animationCaption = <span className="post-list__img-text">{post.text}</span>;
          }

          content = (<div className="post-list__item-content" style={animationStyle}><video width="100%" height="auto" src={p.content.animationUrl} alt={post.text} preload="1" muted autoPlay loop playsInline/>{animationCaption}</div>);
          break;
        case 'photo':
          const photoStyle = {
            paddingTop: (post.content.aspectRatio * 100) + '%'
          };
          let photoCaption;

          if ( post.text ) {
            photoCaption = <span className="post-list__img-text">{post.text}</span>;
          }

          content = (<div className="post-list__item-content" style={photoStyle}><img src={p.content.photoUrl} alt={post.text}/>{photoCaption}</div>);
          break;
        default:
          content = (<div className="post-list__item-content">{post.text}</div>);
          break;
      }

      const PostLink = post.deleted ? <i className="post-list__item-removed fas fa-trash-alt" title={"Пост удален " + post.deleted}></i>: <a target="_blank" rel="noopener noreferrer nofollow" href={post.link} className="post-list__item-link"><i className="fab fa-telegram-plane"></i></a>;

      return  ( <li key={post.id} className={itemClass}>
          {content}
          <div className="post-list__item-bottom">
            {PostLink}
            <Link to={post.pageLink} className="post-list__item-page-link"><i className="fas fa-link"></i></Link>
            <time className="post-list__time">{post.date}</time>
          </div>
        </li> );
    } );

    return (<ul ref={(postListElem) => {this.postListElem = postListElem;}} className="post-list list-unstyled">
      { posts }
    </ul>);
  }
}
export default PostList;
