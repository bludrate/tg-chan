import render from '../modules/render';
import path from 'path';
import makeDir from 'make-dir';
import fs from 'fs';
import getPostLinks from '../../src/modules/getPostLinks';
//import {gzip} from 'node-gzip';

function generate( url ) {
  return render(url).then( ( renderData ) => {
    const {html} = renderData;
    const folder = path.resolve(__dirname, '../..', 'pages' + url);
    const file = folder + '/index.html';

    return makeDir( folder ).then( () => {

      return new Promise((resolve, reject) => {
        //gzip(html).then( data => {
        fs.writeFile( file, html, ( err ) => {
          if ( err ) {
            return reject( err );
          }

          delete renderData.html;

          resolve(renderData);
        } );
        //} );
      });
    } );
  });
}

export default {
  post: ( link, needToUpdateChannel ) => {
    const { pageLink, channelLink } = getPostLinks( link );

    needToUpdateChannel && generate(channelLink);

    return generate(pageLink);
  },
  channel: ( username, needToUpdateMain ) => {
    needToUpdateMain && generate( '/' );

    return generate( '/channel/' + username );
  },
  main: () => {
    return generate('/');
  }
};
