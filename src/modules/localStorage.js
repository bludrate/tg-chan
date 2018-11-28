import { APP_NAME } from '../constants';

class LocalStorage {
  constructor( prefix = '' ) {
    this.prefix = prefix;
  }

  saveState( data ) {
    localStorage.setItem( this.prefix, JSON.stringify( data ) );
  }

  getState() {
    return JSON.parse( localStorage.getItem( this.prefix ) );
  }
}

export default new LocalStorage( APP_NAME );
