import axios from 'axios';
import { API_URL, ACTION_TYPES } from '../constants';

export default {
  onLogoClick: () => ({ type: ACTION_TYPES.CHANNEL.LOGO_CLICK, payload: {} }),
  onBackClick: () => ({ type: ACTION_TYPES.CHANNEL.BACK_CLICK, payload: {} }),
  fetch: ( channelUsername, postIndex ) => ( dispatch ) => {
    return axios.get(API_URL + '/channelWithPosts/' + channelUsername + ( postIndex ? '/' + postIndex : '') )
      .then( resp => resp.data )
      .then( data => {
        dispatch( { type: ACTION_TYPES.CHANNEL.FETCH_OK, payload: data } );
      } );
  }
};
