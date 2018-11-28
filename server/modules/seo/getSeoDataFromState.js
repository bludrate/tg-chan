// import Retext from 'retext';
// import keywords from 'retext-keywords';
//
// const retext = Retext().use( keywords, {maximum: 200} );
//
// function getKeywords( string ) {
//   return new Promise( (resolve, reject) => {
//     retext.process( string, ( err, file ) => {
//       if ( err ) {
//         return reject(err);
//       }
//
//       resolve( file );
//     });
//   } );
// }
import formatSeconds from '../../../src/modules/formatSeconds';
import bytesToSize from '../../../src/modules/bytesToSize';
import htmlToText from 'html-to-text';

function getUrlType( url ) {
  if ( url.match(/\/\d+\/$/) ) {
    return 'post';
  }

  return 'channel';
}

function getFirstSentence( text ) {
  return text.match(/[^\r\n\.]*/)[0];
}

function addPostTitlePostfix(text, postIndex, channelTitle ) {
  text = text.trim();

  if ( text.length > 70 ) {
    return text;
  }

  if ( text.length && !(/[\.|!|?]$/.test( text )) ) {
    text += '. ';
  }

  return `${text}Пост #${postIndex} в "${channelTitle}"`;
}

function addPostDescriptionPostfix( text, channelTitle ) {
  text = text.trim();

  if ( text.length > 160 ) {
    return text;
  }

  if ( !(/[\.|!|?]$/.test( text )) ) {
    text += '.';
  }

  return `${text} Канал "${channelTitle}"`;
}

function isLinkAtStart( content ) {
  const entity = content.text.entities && content.text.entities[0];

  if ( !entity ) {
    return false;
  }

  return entity.type._ === 'textEntityTypeUrl' && entity.offset === 0;
}

export default( url, state ) => {
  const pageType = getUrlType( url );
  const seoData = {
    pageTitle: '',
    pageDescription: '',
    img: ''
  };

  switch( pageType ) {
    case 'channel':
      seoData.pageTitle = state.channel.data.title;
      seoData.pageDescription = state.channel.data.info;
      seoData.img = state.channel.avatar;
      seoData.sitemap = true;
      break;
    case 'post':
      let posts = state.channel.data.posts;
      let post = posts && posts[0];
      let channelTitle = state.channel.data.title;

      if ( !post ) {
        seoData.pageTitle = `Пост не найдет :( в "${channelTitle}"`;
        break;
      }

      switch( post.content.type ){
        case 'messageSticker':
          seoData.pageTitle = `Стикер ${post.content.text.text}`;
          seoData.img = post.content.stickerUrl;
          break;
        case 'messageAudio':
          const audio = post.content.audio;
          const performer = audio.perfomer && ( audio.performer !== '<unknown>' ) ? ' (' + audio.performer + ')': '';

          seoData.pageDescription = `Аудио: ${audio.title}${performer} - ` + formatSeconds( audio.duration );
          //FIXME
          //seoData.img = post.content.stickerUrl;

          seoData.pageTitle = `Аудио: ${audio.title}${performer}`;
          break;
        case 'messagePhoto':
          if ( post.content.text.text ) {
            seoData.pageTitle = getFirstSentence( post.content.text.text );
          } else {
            seoData.pageTitle = 'Изображение';
          }

          seoData.img = post.content.photoUrl;
          break;
        case 'messageDocument':
          seoData.pageTitle = 'Файл: ' + post.content.document.fileName;
          seoData.pageDescription = seoData.pageTitle + ' (' + bytesToSize(post.content.document.size) + ')';
          break;
        case 'messageVideo':
          if ( post.content.text.text ) {
            seoData.pageTitle = getFirstSentence( post.content.text.text );
          } else {
            seoData.pageTitle = 'Видео';
          }

          seoData.img = post.content.videoThumb;
          break;
        case 'messageAnimation':
          if ( post.content.text.text ) {
            seoData.pageTitle = getFirstSentence( post.content.text.text );
          } else {
            seoData.pageTitle = 'Анимация';
          }

          seoData.img = post.content.animationThumb;
          break;
        case 'messageVoiceNote':
          if ( post.content.text.text ) {
            seoData.pageTitle = getFirstSentence( post.content.text.text );
          } else {
            seoData.pageTitle = 'Голосовая Запись';
          }
          break;
        case 'messageCustomServiceAction':
          seoData.pageTitle = post.content.text.text;
          break;
        case 'messageLocation':
          const location = post.content.location;
          seoData.pageTitle = `Локация: ${location.latitude},${location.longitude}`;
          break;
        case 'messageText':
          if ( post.content.webPage && isLinkAtStart(post.content) ) {
            const webPage = post.content.webPage;

            seoData.pageTitle = webPage.title;
            seoData.pageDescription = webPage.description;
          } else {
            seoData.pageTitle = getFirstSentence( post.content.text.text );
          }
          break;
        case 'messageContact':
          seoData.pageTitle = `Контакт: ${post.content.contactName}`;
          seoData.pageDescription = `Контакт: ${post.content.contactName}. Телефон: ${post.content.contactPhone}`;
          seoData.img = post.content.contactAvatarUrl;
          break;
        case 'messageVideoNote':
          seoData.pageTitle = 'Видеозапись';
          seoData.img = post.content.videoThumb;
          break;
        default: seoData.pageTitle = '';
      }

      if ( !seoData.pageDescription ) {
        seoData.pageDescription = seoData.pageTitle;
      }

      if ( !seoData.img ) {
        seoData.img = state.channel.data.avatar;
      }

      seoData.pageTitle = addPostTitlePostfix( seoData.pageTitle, post.postIndex, channelTitle );
      seoData.pageDescription = addPostDescriptionPostfix( seoData.pageDescription, channelTitle );

      if ( post.content.text && post.content.text.text.length > 250 ) {
        seoData.sitemap = true;
      } else {
        seoData.sitemap = false;
      }
      break;
    default:
      seoData.pageTitle = 'Телеграм каналы на TG-CHAN';
      seoData.pageDescription = 'С нами вы быстрее найдете каналы по душе';
      //FIXME
      seoData.img = 'tg chan image';
      seoData.sitemap = true;
  };

  seoData.pageTitle = htmlToText.fromString( seoData.pageTitle );
  seoData.pageDescription = htmlToText.fromString( seoData.pageDescription );

  return seoData;
}
