import KafkaClient from '../../../tg-chan-kafka';
import path from 'path';
import makeDir from 'make-dir';
import fs from 'fs';
import getPostLinks from '../../src/modules/getPostLinks';
import generate from './generate';
import initialGeneration from './initialGeneration';

initialGeneration().then( () => console.log('pages generated') ).catch( console.error );

new KafkaClient().then( kafkaClient => {
  kafkaClient.subscribe( [
    'postUpdateReady',
    'channelUpdateReady'
  ], ( message ) => {
    const data = JSON.parse(message.value);
    const urls = [];

    switch( message.topic ) {
      case 'postUpdateReady':
        generate.post( data.link, true );
        break;
      case 'channelUpdateReady':
        generate.channel( '/channel/' + data.username, true );
        break;
    }
  } );
} );
