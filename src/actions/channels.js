import axios from 'axios';
import { API_URL, ACTION_TYPES } from '../constants';

export default {
  fetch: () => ( dispatch ) => {
    return axios.get(API_URL + '/channel')
      .then( resp => resp.data )
      .then( channels => {
        dispatch( { type: ACTION_TYPES.CHANNELS.FETCH_OK, payload: channels } );
      } );
  }
};
