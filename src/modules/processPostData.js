import React from 'react';
import getPostLinks from './getPostLinks';
//   textEntityTypeTextUrl, and textEntityTypeUrl.

function processTextEntities( text ) {
  if ( !text ) {
    return ;
  }
  const string = text.text;
  const result = [];

  let currentOffset = 0;

  if ( !text.entities || !text.entities.length ) {
    return string;
  }

  text.entities.forEach( entity => {
    if ( currentOffset !== entity.offset ) {
      result.push( string.slice( currentOffset, entity.offset ) );
    }

    const text = string.substr(entity.offset, entity.length);
    const key = entity.offset + entity.length + entity.type._;

    let resultElement;

    switch ( entity.type._ ) {
      case 'textEntityTypeBold':
        resultElement = <b key={key}>{text}</b>;
        break;
      case 'textEntityTypeBotCommand':
        resultElement = <span key={key} className="text-info">{text}</span>;
        break;
      case 'textEntityTypeCashtag':
        resultElement = <span key={key} className="text-info">{text}</span>;
        break;
      case 'textEntityTypeCode':
        resultElement = <code key={key}>{text}</code>
        break;
      case 'textEntityTypeEmailAddress':
        resultElement = <a target="_blank" rel="noopener noreferrer nofollow" key={key} href={ "mailto:" + text }>{text}</a>;
        break;
      case 'textEntityTypeHashtag':
        resultElement = <span key={key} className="text-info">{text}</span>;
        break;
      case 'textEntityTypeItalic':
        resultElement = <i key={key}>{text}</i>;
        break;
      case 'textEntityTypeMention':
        resultElement = <a target="_blank" rel="noopener noreferrer nofollow" key={key} href={"tg://resolve?domain=" + text}>{text}</a>;
        break;
      case 'textEntityTypeMentionName':
        resultElement = <span key={key} className="text-info">{text}</span>;
        break;
      case 'textEntityTypePhoneNumber':
        resultElement = <a target="_blank" rel="noopener noreferrer nofollow" key={key} href={"tel:" + text}>{text}</a>;
        break;
      case 'textEntityTypePre':
        resultElement = <pre key={key}>{text}</pre>;
        break;
      case 'textEntityTypePreCode':
        resultElement = <pre key={key}><code>{text}</code></pre>;
        break;
      case 'textEntityTypeTextUrl':
        resultElement = <a target="_blank" rel="noopener noreferrer nofollow" key={key} href={entity.type.url}>{text}</a>;
        break;
      case 'textEntityTypeUrl':
        let url = text;
        if ( url.indexOf( 'http') !== 0 ) {
          url = 'https://' + url;
        }
        resultElement = <a target="_blank" rel="noopener noreferrer nofollow" key={key} href={url}>{text}</a>;
        break;
      default:
        resultElement = <span key={key}>{text}</span>;
        break;
    }

    result.push( resultElement );

    currentOffset = entity.offset + entity.length;
  } );

  if ( currentOffset !== string.length - 1 ) {
    result.push( string.slice( currentOffset ) );
  }

  return result;
}

export default ( post ) => {
  if ( !post ) {
    return ;
  }

  const { link, pageLink } = getPostLinks( post.link );
  const dateVal = new Date(post.date * 1000);
  const date = window.isServer ? dateVal.toUTCString(): dateVal.toLocaleString();
  const contentType = post.content.type.toLowerCase().replace('message', '');
  const deleted = post.deleted ? new Date(post.deleted * 1000).toLocaleString() : false;

  return {
    link,
    date,
    contentType,
    text: processTextEntities( post.content.text ),
    content: post.content,
    id: post._id,
    pageLink,
    deleted
  };
};
