import { TELEGRAM_CDN, TELEGRAM_CDN_REPLACER, ACTION_TYPES } from '../constants';

const defaultState = {
  showChannelInfo: false,
  data: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANNEL.FETCH_OK:
      if (action.payload.avatar) {
        action.payload.avatar = action.payload.avatar.replace(TELEGRAM_CDN, TELEGRAM_CDN_REPLACER);
      }
      action.payload.posts.forEach(p => {
        const contentType = p.content.type.toLowerCase().replace('message', '');
        switch( contentType ) {
          case 'contact':
            if( p.content.contactAvatarUrl )
              p.content.contactAvatarUrl = p.content.contactAvatarUrl.replace(TELEGRAM_CDN, TELEGRAM_CDN_REPLACER);
            break;
          case 'sticker':
            if (p.content.stickerUrl)
              p.content.stickerUrl = p.content.stickerUrl.replace(TELEGRAM_CDN, TELEGRAM_CDN_REPLACER);
            break;

          case 'video':
            if (p.content.videoThumb)
              p.content.videoThumb = p.content.videoThumb.replace(TELEGRAM_CDN, TELEGRAM_CDN_REPLACER);
            break;
          case 'animation':
            if ( p.content.animationUrl)
              p.content.animationUrl = p.content.animationUrl.replace(TELEGRAM_CDN, TELEGRAM_CDN_REPLACER);
            break;
          case 'photo':
            if (p.content.photoUrl)
              p.content.photoUrl = p.content.photoUrl.replace(TELEGRAM_CDN, TELEGRAM_CDN_REPLACER);
            break;
        }
      });
      return {...state, data: action.payload}
    case ACTION_TYPES.CHANNEL.LOGO_CLICK:
      return {...state, showChannelInfo: true};
    case ACTION_TYPES.CHANNEL.BACK_CLICK:
      return {...state, showChannelInfo: false};
    default:
      return state;
  }
};;
