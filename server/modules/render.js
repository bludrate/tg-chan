import React from 'react';
import ReactDOMServer from 'react-dom/server';
import getStore from '../../src/store';
import App from '../../src/components/App';
import { StaticRouter } from 'react-router-dom';
import path from "path";
import fs from "fs";
import asyncActionsMonitor from '../../src/modules/asyncActionsMonitor';
import seo from './seo';
// import our main App component

export default (url) => {
  return new Promise(( resolve, reject ) => {

    // point to the html file created by CRA's build tool
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            reject(err);
        }

        global.navigator = {
          language: 'ru'
        };

        const store = getStore();

        // render the app as a string
        ReactDOMServer.renderToString(<App router={StaticRouter} location={url} context={{}} store={store}/>);

        Promise.all( asyncActionsMonitor.actions )
          .then(() => {
            const html = ReactDOMServer.renderToString(<App router={StaticRouter} location={url} context={{}} store={store}/>);

            const preloadedState = store.getState();
            const seoData = seo( url, preloadedState );

            // inject the rendered app into our html and send it
            resolve({
              html: htmlData
                .replace(
                  '<div id="root"></div>',
                  `<script>window.__INITIALSTATE__=${JSON.stringify(preloadedState)};window.API_URL="/api";</script><div id="root">${html}</div>`
                )
                .replace(
                  '<head>',
                  '<head>' + seoData.html
                ),
              seo: seoData.data,
              state: preloadedState,
              url
            });
          });
    });
  } );
}
